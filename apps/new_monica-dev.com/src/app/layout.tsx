import type { Metadata } from 'next';

import '@/styles/global.css';

import { Main } from '@/components/layout/Main';

export const metadata = {} satisfies Metadata;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme.js" />
      </head>
      <body>
        {/* <Providers> */}
        <Main>{children}</Main>
        {/* </Providers> */}
      </body>
    </html>
  );
}
