import { Footer } from "@/app/ui/foundation/navigator/footer";
import { Header } from "@/app/ui/foundation/navigator/header";
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
