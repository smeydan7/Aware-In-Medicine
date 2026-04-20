import { cn } from '@/lib/utils';
import { Image as ImageIcon } from 'lucide-react';

type ImagePlaceholderProps = {
  label: string;
  hint?: string;
  aspect?: string;
  className?: string;
};

/**
 * A clearly-labelled placeholder where imagery will live.
 */
export function ImagePlaceholder({
  label,
  hint,
  aspect = 'aspect-[4/3]',
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        'relative w-full rounded-2xl border border-dashed border-clay-200 bg-clay-50/50 overflow-hidden',
        aspect,
        className
      )}
      role="img"
      aria-label={`Image placeholder: ${label}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 gap-2">
        <div className="w-10 h-10 rounded-full bg-clay-100 flex items-center justify-center">
          <ImageIcon className="w-5 h-5 text-clay-400" aria-hidden />
        </div>
        <p className="font-serif text-lg text-ink">{label}</p>
        {hint && <p className="text-xs text-ink-muted max-w-[28ch]">{hint}</p>}
      </div>
    </div>
  );
}
