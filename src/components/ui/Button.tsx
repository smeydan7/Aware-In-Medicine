import Link from 'next/link';
import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-clay-400 text-cream-50 hover:bg-clay-500 active:bg-clay-600 shadow-soft hover:shadow-lift',
  secondary:
    'bg-cream-50 text-ink border border-cream-300 hover:border-clay-300 hover:bg-cream-200',
  ghost: 'text-ink hover:bg-cream-200',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-[15px]',
  lg: 'h-14 px-8 text-base',
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...rest }, ref) => {
    const classes = cn(base, variantStyles[variant], sizeStyles[size], className);

    if ('href' in rest && rest.href) {
      const { href, ...anchorRest } = rest;
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...anchorRest}
        >
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
