import * as styles from './vanilla.css';

import { ThemeSwitch } from '@/ui/navigator/themeSwitch';

interface Props {
  children: React.ReactNode;
}

export const VanillaLayout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.themeSwitchContainer}>
          <ThemeSwitch />
        </div>
        {children}
      </main>
    </div>
  );
};
