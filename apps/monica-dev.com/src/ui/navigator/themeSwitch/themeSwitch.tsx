import * as styles from './themeSwitch.css';

import { Moon, Sun } from '@/ui/icons';

type Theme = 'light' | 'dark';

const judgeTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light';
  }
  if (localStorage.getItem('theme') === 'dark') {
    return 'dark';
  }
  return 'light';
};

export const ThemeSwitch = () => {
  const switchTheme = () => {
    const before = judgeTheme();
    const tweets = document.querySelectorAll('[data-tweet-id]');

    if (before === 'light') {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      tweets.forEach((tweet) => {
        const src = tweet.getAttribute('src');
        if (src) {
          tweet.setAttribute('src', src.replace('theme=light', 'theme=dark'));
        }
      });
    }
    if (before === 'dark') {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      tweets.forEach((tweet) => {
        const src = tweet.getAttribute('src');
        if (src) {
          tweet.setAttribute('src', src.replace('theme=dark', 'theme=light'));
        }
      });
    }
  };

  return (
    <button
      className={styles.themeSwitch}
      onClick={switchTheme}
      id="theme-switch-button"
      aria-label="theme switch button"
    >
      <Moon className={styles.moon} />
      <Sun className={styles.sun} />
    </button>
  );
};
