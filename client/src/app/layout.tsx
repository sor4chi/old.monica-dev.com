import type { Metadata } from 'next';
import Script from 'next/script';

import { SITE_CONFIG } from '@/constant/site';
import { vars } from '@/style/theme.css';
import { Modifier } from '@/ui/app/modifier';
import { Provider } from '@/ui/app/provider';
import { getOgUrl } from '@/util/og';

import '@/style/globals.css';

export const metadata = {
  description: SITE_CONFIG.DESCRIPTION,
  icons: {
    apple: [
      { url: '/icons/apple-icon.png' },
      { sizes: '57x57', type: 'image/png', url: '/icons/apple-icon-57x57.png' },
      { sizes: '60x60', type: 'image/png', url: '/icons/apple-icon-60x60.png' },
      { sizes: '72x72', type: 'image/png', url: '/icons/apple-icon-72x72.png' },
      { sizes: '76x76', type: 'image/png', url: '/icons/apple-icon-76x76.png' },
      { sizes: '114x114', type: 'image/png', url: '/icons/apple-icon-114x114.png' },
      { sizes: '120x120', type: 'image/png', url: '/icons/apple-icon-120x120.png' },
      { sizes: '144x144', type: 'image/png', url: '/icons/apple-icon-144x144.png' },
      { sizes: '152x152', type: 'image/png', url: '/icons/apple-icon-152x152.png' },
      { sizes: '180x180', type: 'image/png', url: '/icons/apple-icon-180x180.png' },
    ],
    icon: [
      { url: '/favicon.ico' },
      { sizes: '192x192', type: 'image/png', url: '/icons/android-icon-192x192.png' },
      { sizes: '32x32', type: 'image/png', url: '/icons/favicon-32x32.png' },
      { sizes: '96x96', type: 'image/png', url: '/icons/favicon-96x96.png' },
      { sizes: '16x16', type: 'image/png', url: '/icons/favicon-16x16.png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/icons/apple-touch-icon-precomposed.png',
      },
    ],
    shortcut: ['/icons/shortcut-icon.png'],
  },
  manifest: '/manifest.json',
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
  themeColor: vars.color.bg.primary,
  title: { default: SITE_CONFIG.TITLE, template: `%s | ${SITE_CONFIG.TITLE}` },
  twitter: {
    card: 'summary_large_image',
    site: `@${SITE_CONFIG.SOCIAL.TWITTER_ID}`,
    title: SITE_CONFIG.TITLE,
  },
} satisfies Metadata;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // observe body class, if it is changed, then change theme
  return (
    <>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme.js" />
      </head>
      <html lang="ja">
        <body>
          <Provider>
            <Modifier>{children}</Modifier>
          </Provider>
        </body>
        <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
      </html>
    </>
  );
}
