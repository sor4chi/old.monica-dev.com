'use client';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';

import * as styles from './modal.css';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  footer?: ReactNode;
}

export const Modal = ({ children, footer, isOpen, onClose, title }: Props) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  return (
    <div className={styles.modal} style={{ display: isOpen ? 'flex' : 'none' }} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>{title && <h2 className={styles.modalTitle}>{title}</h2>}</div>
          <button className={styles.modalClose} onClick={onClose} aria-label="Close this modal">
            <IoIosClose size={24} />
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
        <div className={styles.modalFooter}>{footer}</div>
      </div>
    </div>
  );
};
