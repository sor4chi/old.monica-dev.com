/* eslint-disable @next/next/no-sync-scripts */
import { Header } from '#/ui/layout/header';
import '#/styles/dist.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Monica&apos;s Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Monica's Portfolio" />
        <meta name="author" content="Monica" />
        <meta name="keywords" content="Monica, Portfolio" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="google" content="notranslate" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        <script src="/fouc.js" />
      </head>
      <body className="bg-slate-100 dark:bg-neutral-900 transition-colors duration-300 ease-in-out">
        <Header />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
