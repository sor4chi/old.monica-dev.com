import type { WebSite, WithContext } from 'schema-dts';

import { SITE_CONFIG } from '@/constant/site';
import { getOgUrl } from '@/util/og';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  author: {
    '@type': 'Person',
    name: SITE_CONFIG.AUTHOR,
  },
  description: SITE_CONFIG.DESCRIPTION,
  headline: SITE_CONFIG.TITLE,
  image: [getOgUrl(SITE_CONFIG.TITLE)],
  name: SITE_CONFIG.TITLE,
  url: SITE_CONFIG.URL,
} satisfies WithContext<WebSite>;

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* VE-CSSをLayoutに適用すると反映されなくなることが判明したので、Layout ComponentはPage Componentに適用することにした */}
      {children}
    </>
  );
}
