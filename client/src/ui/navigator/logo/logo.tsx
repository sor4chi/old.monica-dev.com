import Image from 'next/image';

import * as styles from './logo.css';

export const Logo = ({ height = 32, width = 32 }) => (
  <Image src="/logo.svg" alt="logo" width={width} height={height} className={styles.logo} />
);
