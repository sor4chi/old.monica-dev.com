import { styles } from './Main.css';

interface Props {
  children: React.ReactNode;
  side?: boolean;
}

export const Main = ({ children, side }: Props) => (
  <main className={side ? styles.sideMain : styles.fullMain}>{children}</main>
);
