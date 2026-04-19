import { NextResponse } from 'next/server';
import { suggestionSchema } from '@/lib/validation';

/**
 * POST /api/suggestions
 *
 * Receives a condition suggestion from the /suggest page.
 *
 * CURRENT BEHAVIOR: validates input and logs it to the server console.
 * This is intentionally a stub — to ship real submissions, wire one of
 * these in:
 *   - Resend / SendGrid → email the submission to awareinmedicine@gmail.com
 *   - Supabase / Postgres → write to a `suggestions` table
 *   - Airtable / Sheets API → append a row the team can triage
 *   - Notion API → create a page in a "Topic requests" database
 *
 * The validated `data` object below is the only thing you need to pass on.
 */

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body.' },
      { status: 400 }
    );
  }

  const parsed = suggestionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Validation failed.',
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { data } = parsed;

  // TODO: replace with real persistence/email integration
  console.info('[suggestions] new submission', {
    ...data,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json(
    { ok: true, message: 'Submission received.' },
    { status: 201 }
  );
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  );
}
