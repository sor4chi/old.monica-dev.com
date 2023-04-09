import type { ReactNode } from 'react';

import { Snackbars } from '@/ui/foundation/snackbar/snackbar';

interface Props {
  children: ReactNode;
}

export const Modifier = ({ children }: Props) => {
  return (
    <>
      {children}
      <Snackbars />
    </>
  );
};
