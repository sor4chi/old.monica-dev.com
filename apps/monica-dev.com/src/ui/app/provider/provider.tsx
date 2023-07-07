import type { ReactNode } from 'react';

import { SnackbarProvider } from '@/hooks';

interface Props {
  children: ReactNode;
}

export const Provider = ({ children }: Props) => {
  return <SnackbarProvider>{children}</SnackbarProvider>;
};
