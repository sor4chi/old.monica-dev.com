import type { ReactNode } from 'react';
import '@/style/globals.css';

interface Props {
  children: ReactNode;
}

export const GlobalStyle = ({ children }: Props) => {
  return <>{children}</>;
};
