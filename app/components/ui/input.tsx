import * as React from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/styles';

import { baseInputStyles, baseInteractiveStyles, size } from './utils';

import type { VariantProps } from 'class-variance-authority';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size: _size, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ size: _size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export const inputVariants = cva(
  [
    baseInputStyles.base,
    baseInputStyles.file,
    baseInputStyles.placeholder,
    baseInteractiveStyles.focus,
    baseInteractiveStyles.disabled,
  ],
  {
    variants: {
      size,
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export { Input };
