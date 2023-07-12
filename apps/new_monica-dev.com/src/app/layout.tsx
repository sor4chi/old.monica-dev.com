import type { Metadata } from 'next';

import '@/styles/global.css';

export const metadata = {} satisfies Metadata;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme.js" />
      </head>
      <html lang="ja">
        <body>{children}</body>
      </html>
    </>
  );
}
