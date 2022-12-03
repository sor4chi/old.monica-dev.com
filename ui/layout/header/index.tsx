import { ThemeSwitch } from '#/ui/layout/header/theme-switch';

import { Logo } from './logo';
import { Navigation } from './navigation';

export const Header = () => (
  <header className="w-full fixed z-10 border-b border-gray-200 bg-slate-100/60 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/10">
    <div className="m-auto max-w-5xl flex h-16 justify-between items-center">
      <Logo />
      <div className="flex items-center space-x-4">
        <Navigation />
        <ThemeSwitch />
      </div>
    </div>
  </header>
);
