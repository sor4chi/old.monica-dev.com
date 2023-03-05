import Image from "next/image";
import Link from "next/link";
import * as styles from "./header.css";

export const Header = () => {
  return (
    <header className={styles.container}>
      <Link href="/" passHref>
        <Image src="/logo.svg" alt="logo" width={50} height={50} />
      </Link>
      <nav>
        <ul className={styles.navigationList}>
          <li className={styles.navigationListItem}>
            <Link href="/" passHref className={styles.navigationLink}>
              About
            </Link>
          </li>
          <li className={styles.navigationListItem}>
            <Link href="/about" passHref className={styles.navigationLink}>
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
