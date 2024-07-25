import { forwardRef } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/styles';

import {
  baseInputStyles,
  baseInteractiveStyles,
  getSelectCaret,
  size,
} from './utils';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      defaultValue,
      disabled,
      error,
      id,
      label,
      labelClassName,
      options,
      selectPlaceholder,
      size,
      value,
      ...props
    },
    ref,
  ) => {
    // const [theme] = useTheme();

    // css vars won't work in svg images, so have to check the theme and hard code the hex for the colored caret image
    // buggy from mixing codebases. todo: fix
    const dataTheme =
      typeof document === 'undefined'
        ? undefined
        : document.documentElement.getAttribute('data-theme') || undefined;

    const currentColor = dataTheme === 'dark' ? '#ffffff' : '#000000';

    // trying to position and size a background image with tailwind is stupid annoying
    const styles = {
      backgroundImage: getSelectCaret(currentColor),
      backgroundSize: '1rem 1rem',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 1rem center',
      paddingRight: '2.5rem',
    };

    return (
      <select
        ref={ref}
        id={id}
        style={styles}
        className={cn(
          inputVariants({ size, className }),
          error ? baseInputStyles.error : null,
        )}
        disabled={disabled}
        defaultValue={defaultValue}
        value={value}
        {...props}
      >
        {selectPlaceholder && (
          <option value="" disabled>
            {selectPlaceholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            // selected={
            //   String(defaultValue).toLowerCase() === option.value.toLowerCase()
            // }
          >
            {option.label}
          </option>
        ))}
      </select>
    );
  },
);

Select.displayName = 'Select';

type SelectHTMLPropsWithoutSize = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'size'
>;

interface SelectProps
  extends SelectHTMLPropsWithoutSize,
    VariantProps<typeof inputVariants> {
  asChild?: boolean; // need to figure out what this does
  options: { value: string; label: string }[];
  label?: string;
  labelClassName?: string;
  error?: string;
  selectPlaceholder?: string;
}

const inputVariants = cva(
  [
    baseInputStyles.base,
    baseInputStyles.select,
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
