import { ThemeSwitch } from '#/ui/layout/header/theme-switch';

import { Logo } from './logo';
import { Navigation } from './navigation';

export const Header = () => (
  <header className="fixed z-10 w-full backdrop-blur-md">
    <div className="m-auto flex h-16 max-w-5xl items-center justify-between">
      <Logo />
      <div className="flex items-center space-x-4">
        <Navigation />
        <ThemeSwitch />
      </div>
    </div>
  </header>
);
