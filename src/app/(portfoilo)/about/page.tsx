import twemoji from 'twemoji';

import * as styles from './about.css';

export default function About() {
  return (
    <>
      <h1 className={styles.title}>About</h1>
      <p
        className={styles.text}
        dangerouslySetInnerHTML={{
          __html: twemoji.parse('⚠️Now Preparing⚠️', {
            className: 'twemoji',
            ext: '.svg',
            folder: 'svg',
          }),
        }}
      />
    </>
  );
}
