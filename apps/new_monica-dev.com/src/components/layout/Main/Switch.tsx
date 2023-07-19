'use client';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'react-feather';

import { styles } from './SwitchTheme.css';

import { Button } from '@/components/ui/Button';

export const ThemeSwitch = () => {
  const { setTheme, theme } = useTheme();

  const switchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <span className={styles.rightTopArea}>
      <Button onClick={switchTheme} variant="icon">
        <Sun className={styles.sun} size="1.25em" strokeWidth="1.5" />
        <Moon className={styles.moon} size="1.25em" strokeWidth="1.5" />
      </Button>
    </span>
  );
};
