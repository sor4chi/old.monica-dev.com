import * as styles from "./themeSwitch.css";
import { FaMoon, FaSun } from "react-icons/fa";

type Theme = "light" | "dark";

const judgeTheme = (): Theme => {
  if (typeof window === "undefined") {
    return "light";
  }
  if (localStorage.getItem("theme") === "dark") {
    return "dark";
  }
  return "light";
};

export const ThemeSwitch = () => {
  const switchTheme = () => {
    const before = judgeTheme();
    if (before === "light") {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
    if (before === "dark") {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button className={styles.themeSwitch} onClick={switchTheme}>
      <FaMoon className={styles.moon} />
      <FaSun className={styles.sun} />
    </button>
  );
};
