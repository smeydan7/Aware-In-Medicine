/* eslint-disable */
/**
 * Build the Articles content from the source PDFs.
 *
 * Adding a new article = drop `<slug>.pdf` into public/articles/ and a
 * `<slug>-preview.png` into public/articles/previews/. This script then
 * extracts the title, author, date, reading time, abstract and full body
 * text, and writes:
 *   - src/data/generated/articles.json          (metadata for every article)
 *   - src/data/generated/article-content.json   (body blocks, keyed by slug)
 *
 * Category and "featured" can't be read from a PDF, so they come from
 * src/data/article-overrides.ts (optional per article; category defaults to
 * "Other"). Any field in the overrides wins over the auto-extracted value.
 *
 * Run automatically via `predev` / `prebuild`, or manually: `npm run articles`.
 */
const fs = require('fs');
const path = require('path');
const pdfjs = require('pdfjs-dist/legacy/build/pdf.js');

const ROOT = path.resolve(__dirname, '..');
const PDF_DIR = path.join(ROOT, 'public/articles');
const OUT_DIR = path.join(ROOT, 'src/data/generated');

// ── text helpers ──────────────────────────────────────────────────────────
const GLYPHS = {
  'ʼ': '’', // ʼ -> ’
  'ˮ': '”', // ˮ -> ”
  'ﬁ': 'fi',
  'ﬂ': 'fl',
};
function normalize(s) {
  return s.replace(/[ʼˮﬁﬂ]/g, (c) => GLYPHS[c] || c);
}

// Some fonts encode a dash/hyphen as an unmapped Private-Use-Area glyph
// (U+E000–U+F8FF) that renders as "-" but carries no real Unicode value.
// Treat any item that is empty or purely PUA as a "gap" so we can restore
// the dash between adjacent alphanumerics (e.g. "8","","10" -> "8-10").
const isGapGlyph = (s) => s === '' || /^[\uE000-\uF8FF]+$/.test(s);

const BOILER = [
  /^aware in medicine( \(aim\))?$/i,
  /^making medical knowledge accessible for all\.$/i,
  /^awareinmedicine\.org/i,
  /^© \d{4} aware in medicine/i,
  /^aware in medicine is a youth-led/i,
];
const isBoiler = (s) => BOILER.some((re) => re.test(s.trim()));
const isPageNo = (s) => /^\d{1,3}$/.test(s.trim());

const TERM = '.!?”"’)';
const endsTerm = (s) => {
  const t = s.trimEnd();
  return t.length > 0 && TERM.includes(t[t.length - 1]);
};

function isHeading(s, prev) {
  s = s.trim();
  if (!s || s.length > 46) return false;
  if (!/^[A-Z]/.test(s)) return false;
  if ('.,:;”"\''.includes(s[s.length - 1])) return false; // allow ? / !
  if (s.split(/\s+/).length > 7) return false;
  if (/http/.test(s) || s.includes(',') || /et al/i.test(s)) return false;
  if (prev != null && prev.trim()) {
    const p = prev.trim();
    if (!(endsTerm(p) || p[p.length - 1] === ':')) return false;
  }
  return true;
}

// ── PDF extraction ──────────────────────────────────────────────────────────
async function extract(file) {
  const data = new Uint8Array(fs.readFileSync(file));
  const doc = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;
  const lines = [];
  for (let p = 1; p <= doc.numPages; p++) {
    const tc = await (await doc.getPage(p)).getTextContent();
    // Keep only real text items; pdfjs also emits marked-content markers
    // (no transform / undefined str) that would corrupt the line grouping.
    const items = tc.items.filter((it) => it.transform && typeof it.str === 'string');
    let cur = null, y = null, sz = 0, gap = false;
    for (const it of items) {
      const ty = Math.round(it.transform[5]);
      const h = Math.round(Math.hypot(it.transform[2], it.transform[3]));
      if (y === null || Math.abs(ty - y) > 3) {
        if (cur !== null) lines.push({ t: normalize(cur), sz });
        cur = isGapGlyph(it.str) ? '' : it.str; y = ty; sz = h; gap = false;
      } else {
        // Some fonts encode a hyphen/dash as an empty or unmapped PUA glyph
        // (e.g. "8-10" -> "8", <gap>, "10 hours"). Re-insert it between
        // adjacent alphanumerics so number ranges survive.
        if (isGapGlyph(it.str)) { gap = true; continue; }
        if (gap) {
          if (/[A-Za-z0-9]$/.test(cur) && /^[A-Za-z0-9]/.test(it.str)) cur += '-';
          gap = false;
        }
        cur += it.str; sz = Math.max(sz, h);
      }
    }
    if (cur !== null) lines.push({ t: normalize(cur), sz });
  }
  return lines;
}

// ── metadata + body ─────────────────────────────────────────────────────────
function parseDate(raw) {
  // "01.09.26" / "1.9.26" -> ISO (interpreted day.month.year)
  const m = raw.match(/(\d{1,2})\.(\d{1,2})\.(\d{2,4})/);
  if (!m) return null;
  let [, d, mo, y] = m;
  y = y.length === 2 ? '20' + y : y;
  const iso = `${y}-${mo.padStart(2, '0')}-${d.padStart(2, '0')}`;
  return Number.isNaN(new Date(iso).getTime()) ? null : iso;
}

function buildBody(lines) {
  const clean = lines
    .map((l) => l.t)
    .filter((t) => t.trim() && !isBoiler(t) && !isPageNo(t));
  let start = clean.findIndex((t) => t.trim().toLowerCase() === 'abstract');
  if (start < 0) start = 0;
  let body = clean.slice(start);

  // Cut the AiM site footer that trails every article (after References).
  // Extraction can mangle it ("Aware in Medicine (AiM)" -> "Aware in Medicine
  // AiM", wrapped mission sentence), so match it loosely and drop everything
  // from there on.
  const FOOTER = [
    /^aware in medicine\s*\(?\s*aim\s*\)?\s*$/i,
    /breaking down complex medical conditions/i,
    /youth-?led non-?profit/i,
  ];
  const fIdx = body.findIndex((l) => FOOTER.some((re) => re.test(l.trim())));
  if (fIdx > 0) body = body.slice(0, fIdx);

  const widths = body.filter((l) => l.length > 30).map((l) => l.length);
  const thresh = (widths.length ? Math.max(...widths) : 90) - 12;

  const blocks = [];
  let buf = [];
  let inRefs = false;
  let prev = null;

  const flush = () => {
    if (!buf.length) return;
    const text = buf.join(' ').replace(/\s+/g, ' ').trim();
    if (text) blocks.push({ type: 'paragraph', text });
    buf = [];
  };

  for (const l of body) {
    const s = l.trim();
    const low = s.toLowerCase();
    if (low === 'abstract' || low === 'references' || isHeading(s, prev)) {
      flush();
      blocks.push({ type: 'heading', text: s });
      inRefs = low === 'references';
      prev = l;
      continue;
    }
    if (inRefs) {
      if (/^all claims in this article/i.test(s)) { prev = l; continue; }
      const numbered = /^\d+\.\s/.test(s);
      if (buf.length && (numbered || /https?:\/\/\S+$/.test(buf[buf.length - 1].trim()))) flush();
      buf.push(l);
      prev = l;
      continue;
    }
    buf.push(l);
    if (endsTerm(l) && l.length < thresh) flush();
    prev = l;
  }
  flush();

  // tag references
  let refMode = false;
  for (const b of blocks) {
    if (b.type === 'heading') refMode = b.text.toLowerCase() === 'references';
    else if (refMode) b.type = 'reference';
  }
  return blocks;
}

function firstSentences(text, max = 240) {
  const parts = text.split(/(?<=[.!?])\s+/);
  let out = '';
  for (const p of parts) {
    if (out && (out + ' ' + p).length > max) break;
    out = out ? out + ' ' + p : p;
    if (out.length >= max) break;
  }
  return out.trim();
}

function parseMeta(slug, lines, blocks) {
  const authorIdx = lines.findIndex((l) => /^Author\s*:/i.test(l.t));
  // Title block: from first non-boiler line up to Author, split by font size.
  let titleStart = 0;
  while (titleStart < lines.length && isBoiler(lines[titleStart].t)) titleStart++;
  const head = lines.slice(titleStart, authorIdx > 0 ? authorIdx : titleStart + 1)
    .filter((l) => !isBoiler(l.t));
  const titleSize = head.length ? Math.max(...head.map((l) => l.sz)) : 0;
  const titleLines = [];
  const subLines = [];
  for (const l of head) {
    if (Math.abs(l.sz - titleSize) <= 2 && subLines.length === 0) titleLines.push(l.t);
    else subLines.push(l.t);
  }
  const title = titleLines.join(' ').replace(/\s+/g, ' ').trim();
  const subtitle = subLines.join(' ').replace(/\s+/g, ' ').trim() || undefined;

  const author = authorIdx >= 0
    ? lines[authorIdx].t.replace(/^Author\s*:\s*/i, '').trim()
    : slug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');

  const dateLine = lines.find((l) => /date published/i.test(l.t));
  const date = (dateLine && parseDate(dateLine.t)) || null;

  // Abstract paragraph for the excerpt.
  const absIdx = blocks.findIndex((b) => b.type === 'heading' && b.text.toLowerCase() === 'abstract');
  const absPara = absIdx >= 0 ? blocks.slice(absIdx + 1).find((b) => b.type === 'paragraph') : null;
  const excerpt = absPara ? firstSentences(absPara.text) : (subtitle || title);

  // Reading time from body word count (~200 wpm), rounded to nearest minute.
  const words = blocks
    .filter((b) => b.type === 'paragraph')
    .reduce((n, b) => n + b.text.split(/\s+/).length, 0);
  const mins = Math.max(1, Math.round(words / 200));
  const readingTime = `${mins} min`;

  return { title, subtitle, author, date, excerpt, readingTime };
}

// ── main ─────────────────────────────────────────────────────────────────────
async function main() {
  const files = fs.readdirSync(PDF_DIR).filter((f) => f.toLowerCase().endsWith('.pdf'));
  const meta = [];
  const content = {};

  for (const f of files.sort()) {
    const slug = f.replace(/\.pdf$/i, '');
    const lines = await extract(path.join(PDF_DIR, f));
    const blocks = buildBody(lines);
    const m = parseMeta(slug, lines, blocks);
    content[slug] = blocks;
    meta.push({
      slug,
      title: m.title,
      subtitle: m.subtitle,
      author: m.author,
      date: m.date || new Date().toISOString().slice(0, 10),
      readingTime: m.readingTime,
      category: 'Other',
      excerpt: m.excerpt,
      pdf: `/articles/${slug}.pdf`,
    });
    console.log(`✓ ${slug}: "${m.title}" — ${m.author}, ${blocks.length} blocks`);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, 'articles.json'), JSON.stringify(meta, null, 2) + '\n');
  fs.writeFileSync(path.join(OUT_DIR, 'article-content.json'), JSON.stringify(content, null, 2) + '\n');
  console.log(`\nWrote ${meta.length} articles to src/data/generated/`);
}

main().catch((e) => { console.error(e); process.exit(1); });
