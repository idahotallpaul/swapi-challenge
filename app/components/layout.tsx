import * as React from 'react';

import { NavLink } from '@remix-run/react';

import { cn } from '@/lib/styles';

import { buttonVariants } from './ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="container">
      <div className="prose mb-4">
        <h1 className="text-primary/80">Star Wars Character finder</h1>
        <h3>Search for characters by Name, Planet or Species</h3>
      </div>

      <div className="flex max-w-max shrink gap-2 rounded-xl bg-muted p-2">
        <NavLink
          to="/"
          prefetch="intent"
          className={({ isActive, isPending }) =>
            cn(
              buttonVariants({
                variant: isActive ? 'primary' : 'ghost',
                className: isPending ? 'pointer-events-none' : '',
              }),
            )
          }
        >
          Name
        </NavLink>

        <NavLink
          to="Planet"
          prefetch="intent"
          className={({ isActive, isPending }) =>
            cn(
              buttonVariants({
                variant: isActive ? 'primary' : 'ghost',
                className: isPending ? 'pointer-events-none opacity-50' : '',
              }),
            )
          }
        >
          Planet
        </NavLink>

        <NavLink
          to="Species"
          prefetch="intent"
          className={({ isActive, isPending }) =>
            cn(
              buttonVariants({
                variant: isActive ? 'primary' : 'ghost',
                className: isPending ? 'pointer-events-none opacity-50' : '',
              }),
            )
          }
        >
          Species
        </NavLink>
      </div>

      {children}
    </main>
  );
};

export default Layout;
