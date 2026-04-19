import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: 'sage' | 'clay' | 'gold' | 'neutral';
};

const toneStyles = {
  sage: 'bg-sage-100 text-sage-700 border-sage-200',
  clay: 'bg-clay-50 text-clay-700 border-clay-100',
  gold: 'bg-gold-100 text-ink border-gold-300/40',
  neutral: 'bg-cream-200 text-ink-soft border-cream-300',
} as const;

export function Badge({ tone = 'neutral', className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border',
        toneStyles[tone],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
