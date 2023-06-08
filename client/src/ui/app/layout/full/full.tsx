import Image from 'next/image';

import * as styles from './full.css';

import { Footer } from '@/ui/navigator/footer';
import { Header } from '@/ui/navigator/header';

interface Props {
  children: React.ReactNode;
}

export const FullLayout = ({ children }: Props) => {
  return (
    <>
      <Image src="/images/bg-dark.webp" width={1000} height={300} className={styles.bgImage} alt="background-image" />
      <div className={styles.wrapper}>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </>
  );
};
