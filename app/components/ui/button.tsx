import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/styles';

import { baseInteractiveStyles, size } from './utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size: _size, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size: _size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap rounded-sm border text-sm font-bold',
    baseInteractiveStyles.focus,
    baseInteractiveStyles.disabled,
  ],
  {
    variants: {
      variant: {
        primary: [
          'border-primary bg-primary text-primary-foreground',
          'hover:border-primary-active hover:bg-primary-active',
          'focus:border-primary-active focus:bg-primary-active',
        ],
        secondary: [
          'border-border text-muted-foreground',
          'hover:border-border hover:bg-muted',
          'focus:border-border focus:bg-muted',
        ],
        accent: [
          'border-accent bg-accent text-accent-foreground ',
          'hover:border-accent-active hover:bg-accent-active',
          'focus:border-accent-active focus:bg-accent-active',
        ],
        ghost: [
          'border-transparent text-muted-foreground',
          'hover:border-muted hover:bg-muted',
          'focus:border-muted focus:bg-muted',
        ],
        link: [
          'text-link border-transparent underline',
          'hover:border-muted hover:bg-muted',
          'focus:border-muted focus:bg-muted',
        ],
        destructive: [
          'border-destructive bg-destructive text-destructive-foreground ',
          'hover:border-destructive-active hover:bg-destructive-active',
          'focus:border-destructive-active focus:bg-destructive-active',
        ],

        // currently unused semantic variants. delete?
        info: [
          'border-info bg-info text-info-foreground',
          'hover:border-info-active hover:bg-info-active',
          'focus:border-info-active focus:bg-info-active',
        ],
        success: [
          'border-success bg-success text-success-foreground ',
          'hover:border-success-active hover:bg-success-active',
          'focus:border-success-active focus:bg-success-active',
        ],
        warning: [
          'border-warning bg-warning text-warning-foreground ',
          'hover:border-warning-active hover:bg-warning-active',
          'focus:border-warning-active focus:bg-warning-active',
        ],
      },
      size: {
        ...size,
      },
      shape: {
        circle: 'rounded-full',
        square: '',
      },
      // todo: rethink this? maybe just use a different component?
      usage: {
        button: '',
        inline: [
          'min-h-0 flex-wrap py-0 [font-size:inherit]',
          'whitespace-normal font-bold normal-case leading-normal',
          'decoration-[0.5px] underline-offset-2',
        ],
      },
    },
    compoundVariants: [
      // <Button size="xs" shape="circle|square" />
      {
        shape: ['circle', 'square'],
        size: ['xs'],
        class: 'h-[26px] w-[26px]',
      },
      // <Button size="sm" shape="circle|square" />
      {
        shape: ['circle', 'square'],
        size: ['sm'],
        class: 'h-[38px] w-[38px]',
      },
      // <Button size="md" shape="circle|square" />
      {
        shape: ['circle', 'square'],
        size: ['md'],
        class: 'h-[46px] w-[46px]',
      },
      // <Button size="lg" shape="circle|square" />
      {
        shape: ['circle', 'square'],
        size: ['lg'],
        class: 'h-[62px] w-[62px]',
      },
      // <Button usage="inline" variant="link|ghost" />
      {
        variant: ['link', 'ghost'],
        usage: ['inline'],
        class: 'px-0',
      },
    ],

    defaultVariants: {
      variant: 'primary',
      size: 'md',
      shape: undefined,
      usage: 'button',
    },
  },
);

export { Button, buttonVariants };
