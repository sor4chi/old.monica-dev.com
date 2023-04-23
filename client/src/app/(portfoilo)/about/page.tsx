import type { Metadata } from 'next';
import Image from 'next/image';

import * as styles from './about.css';

import { clientEnv } from '@/env/client';
import { AboutContent } from '@/ui/feature/about/content';
import { SocialList } from '@/ui/feature/account/socialList';
import { getOgUrl } from '@/util/og';

const title = '私について';
const publishedAt = '2023-03-01';
// const updatedAt = '2023-03-18';

export const metadata = {
  openGraph: {
    images: [
      {
        alt: title,
        height: 630,
        url: getOgUrl(title),
        width: 1200,
      },
    ],
    publishedTime: new Date(publishedAt).toISOString(),
    title,
    type: 'article',
    url: `${clientEnv.NEXT_PUBLIC_SITE_URL}/about`,
  },
  title,
  twitter: {
    card: 'summary_large_image',
    images: [getOgUrl(title)],
    title,
  },
} satisfies Metadata;

export default async function About() {
  return (
    <>
      <section className={styles.hero}>
        <Image
          src="/icon.webp"
          alt="Monica / Sor4chi"
          width={160}
          height={160}
          className={styles.icon}
          loading="eager"
        />
        <div>
          <h1 className={styles.title}>Monica / Sor4chi</h1>
          <div className={styles.socialListContainer}>
            <SocialList id />
          </div>
        </div>
      </section>
      <AboutContent />
    </>
  );
}
