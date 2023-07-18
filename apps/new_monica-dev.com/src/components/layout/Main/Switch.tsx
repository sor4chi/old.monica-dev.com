'use client';
import { Moon, Sun } from 'react-feather';

import { styles } from './SwitchTheme.css';

import { Button } from '@/components/ui/Button';
import { useViewTransition } from '@/hooks/use-view-transition';

const judgeTheme = () => {
  if (typeof window === 'undefined') {
    return 'light';
  }
  if (localStorage.getItem('theme') === 'dark') {
    return 'dark';
  }
  return 'light';
};

export const ThemeSwitch = () => {
  const { startViewTransition: switchTheme } = useViewTransition(() => {
    const before = judgeTheme();

    if (before === 'light') {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    if (before === 'dark') {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  });

  return (
    <span className={styles.rightTopArea}>
      <Button onClick={switchTheme} variant="icon">
        <Sun className={styles.sun} size="1.25em" strokeWidth="1.5" />
        <Moon className={styles.moon} size="1.25em" strokeWidth="1.5" />
      </Button>
    </span>
  );
};
