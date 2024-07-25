import { cva } from 'class-variance-authority';

import { cn } from '@/lib/styles';

// shared styling for inputs and buttons

export const baseInteractiveStyles = {
  focus: cn([
    'ring-offset-background transition',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  ]),
  focusInset: cn([
    'ring-offset-background transition',
    'rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
  ]),
  disabled: cn('disabled:cursor-not-allowed disabled:opacity-50'),
};

export const baseInputStyles = {
  base: cn(
    'flex w-full overflow-hidden rounded-lg border border-input bg-background text-sm text-foreground',
  ),
  file: cn([
    'file:bg-background-alt file:border-0 file:text-sm file:text-foreground',
    // todo: add offsets for non-medium sizes if ever needed
    'file:-my-3 file:-ml-4 file:mr-4 file:p-[inherit]',
  ]),
  select: cn('appearance-none overflow-hidden text-ellipsis'),
  placeholder: cn('placeholder:text-muted-foreground'),
  error: cn(
    'border-destructive-input/60 text-destructive-input border-opacity-20',
    'focus-visible:ring-destructive-input',
  ),
  errorText: cn('text-destructive-input'),
  helpText: cn('text-muted-foreground'),
  disabledText: cn('pointer-events-none opacity-50'),
};

export const checkBoxRadioStyles = {
  base: cn(
    'flex shrink-0 items-center justify-center text-current',
    'cursor-pointer text-foreground disabled:cursor-none',
    'aria-checked:bg-clickable-background',
    'border border-input bg-background',
  ),
  checkbox: cn('rounded-lg'),
  radio: cn('rounded-full'),
  indicator: cn(
    'relative flex h-full w-full items-center justify-center overflow-visible text-current',
  ),
  size: {
    xs: cn('mr-3 mt-1.5 h-4 w-4 rounded-lg'),
    sm: cn('mr-4 mt-1 h-5 w-5 rounded-lg'),
    md: cn('mr-5 mt-0.5 h-6 w-6 rounded-lg'),
    lg: cn('mr-6 mt-0 h-7 w-7 rounded-lg'),
  },
};

// shared sizing for buttons and inputs
export const size = {
  xs: cn('min-h-[26px] gap-1 rounded-lg px-1 py-1 text-xs'),
  sm: cn('min-h-[38px] gap-1.5 rounded-lg px-2 py-2 text-sm'),
  md: cn('min-h-[46px] gap-1.5 rounded-lg px-3 py-3 text-sm'),
  lg: cn('min-h-[62px] gap-2 rounded-lg px-5 py-4 text-lg'),
};

export const secondaryTextVariants = cva([''], {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-md',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const getSelectCaret = (color: string) => {
  const encodedColor = encodeURIComponent(color);

  const caret = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${encodedColor}' aria-hidden='true' class='h-4 w-4 stroke-2 transition duration-300 '%3E%3Cpath fill-rule='evenodd' d='M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")`;

  return caret;
};
