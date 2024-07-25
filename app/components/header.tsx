import * as React from 'react';

import { LaptopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Link } from '@remix-run/react';
import { useHydrated } from 'remix-utils/use-hydrated';

import {
  getTheme,
  setTheme as setSystemTheme,
} from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const hydrated = useHydrated();
  const [, rerender] = React.useState({});
  const setTheme = React.useCallback((theme: string) => {
    setSystemTheme(theme);
    rerender({});
  }, []);
  const theme = getTheme();

  return (
    <header className="flex items-center justify-between px-4 py-2 md:py-4">
      <div className="flex items-center space-x-4">
        <Link className="flex items-center space-x-2" to="/">
          <span className="text-lg font-bold">Paul Terhaar</span>
        </Link>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="h-10 w-10 rounded-full border"
            size="md"
            variant="ghost"
          >
            <span className="sr-only">Theme selector</span>
            {!hydrated ? null : theme === 'dark' ? (
              <MoonIcon />
            ) : theme === 'light' ? (
              <SunIcon />
            ) : (
              <LaptopIcon />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-2">
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <button
              type="button"
              className="w-full"
              onClick={() => setTheme('light')}
            >
              Light
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button
              type="button"
              className="w-full"
              onClick={() => setTheme('dark')}
            >
              Dark
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button
              type="button"
              className="w-full"
              onClick={() => setTheme('system')}
            >
              System
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
