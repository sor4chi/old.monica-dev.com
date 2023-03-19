import type { ReactNode } from 'react';
import { useState } from 'react';

import type { MenuItem } from '@/constant/menu';
import { createCtx } from '@/util/context';

type IMenuContext = {
  menuActive: MenuItem;
  setMenuActive: (menuItem: MenuItem) => void;
};

const [useMenu, SetMenuProvider] = createCtx<IMenuContext>();

export { useMenu };

const useMenuCtx = (): IMenuContext => {
  const [menuActive, setMenuActive] = useState<MenuItem>('Home');

  return {
    menuActive,
    setMenuActive,
  };
};

interface Props {
  children: ReactNode;
}

export const MenuProvider = ({ children }: Props) => {
  const Menu = useMenuCtx();
  return <SetMenuProvider value={Menu}>{children}</SetMenuProvider>;
};
