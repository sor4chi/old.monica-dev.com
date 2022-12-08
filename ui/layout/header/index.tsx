import { ThemeSwitch } from '#/ui/layout/header/theme-switch';

import { Logo } from './logo';
import { Navigation } from './navigation';

export const Header = () => (
  <header className="w-full fixed z-10 backdrop-blur-md">
    <div className="m-auto max-w-5xl flex h-16 justify-between items-center">
      <Logo />
      <div className="flex items-center space-x-4">
        <Navigation />
        <ThemeSwitch />
      </div>
    </div>
  </header>
);
