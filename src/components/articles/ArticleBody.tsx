import { Fragment } from 'react';
import type { ArticleBlock } from '@/types';

type ArticleBodyProps = {
  blocks: ArticleBlock[];
};

/**
 * Renders an article's embedded text content. Headings become section
 * titles, paragraphs flow as prose, and consecutive reference entries
 * are grouped into an ordered list.
 *
 * Links inside text (bare URLs) are auto-linked so references stay clickable.
 */
export function ArticleBody({ blocks }: ArticleBodyProps) {
  const out: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (block.type === 'reference') {
      // Gather the whole reference run into a single ordered list.
      const refs: string[] = [];
      while (i < blocks.length && blocks[i].type === 'reference') {
        refs.push(blocks[i].text.replace(/^\d+\.\s*/, ''));
        i += 1;
      }
      out.push(
        <ol
          key={`refs-${i}`}
          className="mt-4 space-y-3 list-decimal pl-5 text-sm text-ink-muted leading-relaxed break-words"
        >
          {refs.map((r, r_i) => (
            <li key={r_i}>{linkify(r)}</li>
          ))}
        </ol>
      );
      continue;
    }

    if (block.type === 'heading') {
      out.push(
        <h2
          key={i}
          className="font-serif text-2xl md:text-3xl text-ink mt-12 mb-4 first:mt-0 scroll-mt-24"
        >
          {block.text}
        </h2>
      );
      i += 1;
      continue;
    }

    out.push(
      <p key={i} className="mt-5 text-ink-soft text-lg leading-relaxed">
        {linkify(block.text)}
      </p>
    );
    i += 1;
  }

  return <div className="max-w-none">{out}</div>;
}

/** Turn bare URLs in a string into clickable links. */
function linkify(text: string): React.ReactNode {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, idx) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={idx}
          href={part}
          target="_blank"
          rel="noreferrer"
          className="text-clay-600 hover:text-clay-700 underline underline-offset-2 break-all"
        >
          {part}
        </a>
      );
    }
    return <Fragment key={idx}>{part}</Fragment>;
  });
}
