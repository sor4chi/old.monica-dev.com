import type { ReactNode } from 'react';

import { MODAL_ID } from '@/constant/id';
import { Snackbars } from '@/ui/foundation/snackbar/snackbar';

interface Props {
  children: ReactNode;
}

export const Modifier = ({ children }: Props) => {
  return (
    <>
      {children}
      <Snackbars />
      <div id={MODAL_ID}></div>
    </>
  );
};
