import type { Metadata } from 'next';

import * as styles from './about.css';

import { parseTwemoji } from '@/lib/twemoji';

export const metadata = {
  title: 'About',
} satisfies Metadata;

export default function About() {
  return (
    <>
      <h1 className={styles.title}>About</h1>
      <p
        className={styles.text}
        dangerouslySetInnerHTML={{
          __html: parseTwemoji('⚠️Now Preparing⚠️'),
        }}
      />
    </>
  );
}
