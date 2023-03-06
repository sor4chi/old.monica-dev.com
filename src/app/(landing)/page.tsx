import * as styles from "./index.css";
import { FaGithub, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { ThemeSwitch } from "@/ui/foundation/navigator/themeSwitch";

export default function Home() {
  return (
    <article className={styles.container}>
      <div className={styles.themeSwitchContainer}>
        <ThemeSwitch />
      </div>
      <Image
        src="/icon.webp"
        alt="Monica / Sor4chi"
        width={240}
        height={240}
        className={styles.icon}
      />
      <h1 className={styles.title}>
        <span className={styles.titleToggle}>
          <span>Sor4chi</span>
          <span>Monica</span>
        </span>
        <span style={{ display: "inline" }}>Portfolio</span>
      </h1>
      <p className={styles.subtitle}>Web App Developer</p>
      <ul className={styles.social}>
        <li className={styles.socialItem}>
          <Link
            href="https://twitter.com/monica18_pr"
            target="_blank"
            className={styles.socialLink}
            passHref
          >
            <FaTwitter size="2rem" />
          </Link>
        </li>
        <li className={styles.socialItem}>
          <Link
            href="https://github.com/sor4chi"
            target="_blank"
            className={styles.socialLink}
            passHref
          >
            <FaGithub size="2rem" />
          </Link>
        </li>
      </ul>
    </article>
  );
}
