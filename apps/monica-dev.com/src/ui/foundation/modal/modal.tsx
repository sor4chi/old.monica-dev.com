'use client';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

import * as styles from './modal.css';

import { XMark } from '@/ui/icons';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  footer?: ReactNode;
}

const MODAL_TITLE_ID = 'modal-title';

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
    <div
      className={styles.modal}
      style={{ visibility: isOpen ? 'visible' : 'hidden' }}
      onClick={onClose}
      role="dialog"
      area-modal="true"
      area-labelledby={MODAL_TITLE_ID}
      tabIndex={-1}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            {title && (
              <h2 className={styles.modalTitle} id={MODAL_TITLE_ID} area-label={title}>
                {title}
              </h2>
            )}
          </div>
          <button className={styles.modalClose} onClick={onClose} aria-label="Close this modal">
            <XMark className={styles.modalCloseIcon} />
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
        <div className={styles.modalFooter}>{footer}</div>
      </div>
    </div>
  );
};
