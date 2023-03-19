import * as styles from './full.css';

import { Footer } from '@/ui/navigator/footer';
import { Header } from '@/ui/navigator/header';

interface Props {
  children: React.ReactNode;
}

export const FullLayout = ({ children }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};
