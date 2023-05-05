'use client';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { MODAL_ID } from '@/constant/id';

interface Props {
  children: ReactNode;
}

export const ModalPortal = ({ children }: Props) => {
  if (typeof document === 'undefined') return null;
  const el = document.getElementById(MODAL_ID);
  if (!el) return null;
  return createPortal(children, el);
};
