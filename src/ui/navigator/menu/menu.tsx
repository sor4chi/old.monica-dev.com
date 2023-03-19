import { Logo } from '../logo';

import * as styles from './menu.css';

export const Menu = () => {
  return (
    <>
      <aside className={styles.wrapper}>
        <div className={styles.logoContainer}>
          <Logo height={16} width={16} />
          Monica.log
        </div>
        <div className={styles.menu}>
          <div className={styles.menuItem}>Home</div>
          <div className={styles.menuItem}>About</div>
          <div className={styles.menuItem}>Contact</div>
        </div>
      </aside>
    </>
  );
};
