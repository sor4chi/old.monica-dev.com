'use client';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { MODAL_ID } from '@/constant/id';

interface Props {
  children: ReactNode;
}

export const ModalPortal = ({ children }: Props) => {
  const [modalRef, setModalRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const modal = document.getElementById(MODAL_ID);
    setModalRef(modal);
  }, []);

  return modalRef ? createPortal(children, modalRef) : null;
};
