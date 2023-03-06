import Image from 'next/image';

import * as styles from './logo.css';

export const Logo = () => <Image src="/logo.svg" alt="logo" width={32} height={32} className={styles.logo} />;
