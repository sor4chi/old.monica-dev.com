'use client';

import { ThemeProvider } from 'next-themes';

import { darkClass, lightClass } from '@/styles/theme.css';

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      value={{
        dark: darkClass,
        light: lightClass,
      }}
    >
      {children}
    </ThemeProvider>
  );
}
