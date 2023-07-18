import { styles } from './Main.css';
import { ThemeSwitch } from './Switch';

interface Props {
  children: React.ReactNode;
}

export const Main = ({ children }: Props) => {
  return (
    <>
      <ThemeSwitch />
      <main className={styles.main}>{children}</main>
    </>
  );
};
