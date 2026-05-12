import type { HTMLInputAttributes } from 'svelte/elements';

export type InputVariant = 'default' | 'ghost';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputProps = Omit<HTMLInputAttributes, 'class' | 'size'> & {
  value?: string;
  className?: string;
  variant?: InputVariant;
  size?: InputSize;
  invalid?: boolean;
};
