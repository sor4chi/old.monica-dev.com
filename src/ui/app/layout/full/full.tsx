import { Footer } from "@/ui/foundation/navigator/footer";
import { Header } from "@/ui/foundation/navigator/header";
import * as styles from "./full.css";

interface Props {
  children: React.ReactNode;
}

export const FullLayout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};
