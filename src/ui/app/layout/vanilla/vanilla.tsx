import * as styles from "./vanilla.css";

interface Props {
  children: React.ReactNode;
}

export const VanillaLayout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>{children}</main>
    </div>
  );
};
