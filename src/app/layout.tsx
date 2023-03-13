import type { Metadata } from 'next';

import { getOgUrl } from './api/og/route';

import { SITE_CONFIG } from '@/constant/site';
import { themeClass } from '@/style/theme.css';

import '@/style/globals.css';

export const metadata = {
  description: SITE_CONFIG.DESCRIPTION,
  metadataBase: new URL(SITE_CONFIG.URL),
  openGraph: {
    description: SITE_CONFIG.DESCRIPTION,
    images: [
      {
        alt: SITE_CONFIG.TITLE,
        height: 630,
        url: getOgUrl(SITE_CONFIG.TITLE),
        width: 1200,
      },
    ],
    locale: 'ja_JP',
    siteName: SITE_CONFIG.TITLE,
    title: SITE_CONFIG.TITLE,
    type: 'website',
    url: SITE_CONFIG.URL,
  },
  title: { default: SITE_CONFIG.TITLE, template: `%s | ${SITE_CONFIG.TITLE}` },
  twitter: {
    card: 'summary_large_image',
    site: `@${SITE_CONFIG.SOCIAL.TWITTER_ID}`,
    title: SITE_CONFIG.TITLE,
  },
} satisfies Metadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // observe body class, if it is changed, then change theme
  return (
    <>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme.js" />
      </head>
      <html lang="ja">
        <body className={themeClass}>{children}</body>
      </html>
    </>
  );
}
