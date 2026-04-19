'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { suggestionSchema } from '@/lib/validation';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type FormStatus =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string };

/**
 * Condition suggestion form.
 *
 * Replaces the original Google Forms iframe with a native, accessible,
 * styled form. Validates with Zod on both client and server, then POSTs
 * to /api/suggestions. Status pattern uses a discriminated union so the UI
 * can't show "loading" and "success" at the same time.
 */
export function SuggestionForm() {
  const [status, setStatus] = useState<FormStatus>({ kind: 'idle' });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const payload = {
      condition: String(formData.get('condition') ?? ''),
      context: String(formData.get('context') ?? ''),
      email: String(formData.get('email') ?? ''),
    };

    // Client-side validation first — fail fast without a network round-trip
    const parsed = suggestionSchema.safeParse(payload);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === 'string' && !errors[key]) {
          errors[key] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    setStatus({ kind: 'submitting' });
    try {
      const res = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setStatus({
          kind: 'error',
          message: body?.error ?? 'Something went wrong. Please try again.',
        });
        return;
      }

      setStatus({ kind: 'success' });
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus({
        kind: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    }
  }

  if (status.kind === 'success') {
    return (
      <div className="rounded-3xl bg-sage-50 border border-sage-200 p-8 md:p-12 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sage-100 text-sage-600 mb-5">
          <CheckCircle2 className="w-7 h-7" aria-hidden />
        </div>
        <h3 className="font-serif text-2xl md:text-3xl text-ink">
          Thank you — got it.
        </h3>
        <p className="mt-3 text-ink-soft max-w-md mx-auto leading-relaxed">
          Your suggestion has been received. We read every submission and use
          them to shape future content.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: 'idle' })}
          className="mt-6 text-clay-500 hover:text-clay-600 font-medium"
        >
          Submit another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Condition name */}
      <Field
        id="condition"
        name="condition"
        label="What condition would you like to see next?"
        required
        error={fieldErrors.condition}
        input={
          <input
            id="condition"
            name="condition"
            type="text"
            required
            maxLength={120}
            autoComplete="off"
            placeholder="e.g. Postural tachycardia syndrome"
            aria-invalid={Boolean(fieldErrors.condition)}
            aria-describedby={fieldErrors.condition ? 'condition-error' : undefined}
            className={inputClass(Boolean(fieldErrors.condition))}
          />
        }
      />

      {/* Why */}
      <Field
        id="context"
        name="context"
        label="Why this one? (optional)"
        hint="A sentence on why it matters to you helps us prioritize."
        error={fieldErrors.context}
        input={
          <textarea
            id="context"
            name="context"
            rows={4}
            maxLength={500}
            aria-invalid={Boolean(fieldErrors.context)}
            aria-describedby={fieldErrors.context ? 'context-error' : undefined}
            className={cn(inputClass(Boolean(fieldErrors.context)), 'h-auto py-3 resize-y')}
          />
        }
      />

      {/* Email */}
      <Field
        id="email"
        name="email"
        label="Email (optional)"
        hint="Only if you'd like a note when we cover it."
        error={fieldErrors.email}
        input={
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            className={inputClass(Boolean(fieldErrors.email))}
          />
        }
      />

      {/* Server error */}
      {status.kind === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-3 p-4 rounded-2xl bg-clay-50 border border-clay-200 text-clay-700"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden />
          <p className="text-sm">{status.message}</p>
        </div>
      )}

      {/* Submit */}
      <div className="pt-2">
        <Button type="submit" size="lg" disabled={status.kind === 'submitting'}>
          {status.kind === 'submitting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
              Submitting…
            </>
          ) : (
            <>Submit suggestion</>
          )}
        </Button>
        <p className="mt-3 text-xs text-ink-muted">
          We won't share your submission. Educational content only — never
          medical advice.
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  required,
  error,
  input,
}: {
  id: string;
  name: string;
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block">
        <span className="font-serif text-lg text-ink">
          {label}
          {required && <span className="text-clay-500 ml-0.5" aria-hidden>*</span>}
        </span>
        {hint && <span className="block mt-1 text-sm text-ink-muted">{hint}</span>}
      </label>
      <div className="mt-3">{input}</div>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 text-sm text-clay-600 flex items-center gap-1.5"
        >
          <AlertCircle className="w-3.5 h-3.5" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    'w-full h-12 px-4 rounded-2xl bg-cream-50 border text-ink placeholder:text-ink-muted transition-colors focus:outline-none focus:ring-0',
    hasError
      ? 'border-clay-300 focus:border-clay-400'
      : 'border-cream-300 focus:border-clay-300'
  );
}
