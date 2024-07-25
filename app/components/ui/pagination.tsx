import * as React from 'react';

import { NavLink } from '@remix-run/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';

import { cn } from '@/lib/styles';
import { buttonVariants } from '@/components/ui/button';

import type { ButtonProps } from '@/components/ui/button';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
  children?:
    | React.ReactNode
    | ((props: React.ComponentProps<typeof NavLink>) => React.ReactNode);
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<typeof NavLink>;

const PaginationLink = ({
  children,
  className,
  disabled,
  isActive,
  size = 'sm',
  ...props
}: /**
 * Fixes the type error by ensuring the 'style' property is correctly typed.
 */
// Start of Selection
PaginationLinkProps) =>
  isActive ? (
    <button
      aria-current="page"
      className={cn(
        buttonVariants({
          variant: disabled ? 'ghost' : 'secondary',
          size,
        }),
        'pointer-events-none',
        className,
      )}
      disabled={disabled}
    >
      {typeof children !== 'function' && children}
    </button>
  ) : (
    <NavLink
      className={cn(
        buttonVariants({
          variant: 'ghost',
          size,
        }),
        className,
      )}
      prefetch="intent"
      {...props}
    >
      {children}
    </NavLink>
  );

PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="md"
    className={cn('gap-1 pl-2.5', className)}
    disabled
    {...props}
  >
    <ChevronLeftIcon className="h-4 w-4" />
    {typeof children !== 'function' && children}
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="md"
    className={cn('gap-1 pr-2.5', className)}
    disabled
    {...props}
  >
    {typeof children !== 'function' && children}
    <ChevronRightIcon className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  className,
  size,
  ...props
}: React.ComponentProps<'span'> & { size: ButtonProps['size'] }) => (
  <span
    aria-hidden
    // className={cn('flex h-9 w-9 items-center justify-center', className)}
    className={cn(
      buttonVariants({
        variant: 'ghost',
        size,
      }),
      className,
    )}
    {...props}
  >
    <DotsHorizontalIcon
      className={cn(size === 'sm' ? 'h-3 w-3' : 'h-4 w-4', '-mx-[1em]')}
    />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
