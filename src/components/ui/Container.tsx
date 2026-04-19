import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  as?: 'div' | 'section' | 'article' | 'header' | 'footer';
  size?: 'default' | 'narrow' | 'wide';
};

const sizeMap = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
} as const;

export function Container({
  as: Tag = 'div',
  size = 'default',
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-5 sm:px-8 lg:px-12',
        sizeMap[size],
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
