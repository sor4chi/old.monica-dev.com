import Image from 'next/image';

import * as styles from './vanilla.css';

import { ThemeSwitch } from '@/ui/navigator/themeSwitch';

interface Props {
  children: React.ReactNode;
}

export const VanillaLayout = ({ children }: Props) => {
  return (
    <>
      <Image src="/images/bg-dark.webp" width={1000} height={300} className={styles.bgImage} alt="background-image" />
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.themeSwitchContainer}>
            <ThemeSwitch />
          </div>
          {children}
        </main>
      </div>
    </>
  );
};
