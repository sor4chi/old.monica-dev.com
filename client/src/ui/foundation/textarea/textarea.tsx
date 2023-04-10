import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef, useState } from 'react';

import { INDENT_SIZE, TAB_KEY } from './constants';
import * as styles from './textarea.css';

type Props = ComponentPropsWithoutRef<'textarea'> & {
  placeholder?: string;
  error?: string;
  label?: string;
  id: string;
  resize?: boolean;
  height?: string;
  rows?: number;
  onFileDrop?: (file: File) => Promise<string>;
};

const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.key === TAB_KEY) {
    e.preventDefault();
    const target = e.target as HTMLTextAreaElement;
    const start = target.selectionStart;
    const end = target.selectionEnd;
    target.value = `${target.value.substring(0, start)}${' '.repeat(INDENT_SIZE)}${target.value.substring(end)}`;
    target.selectionStart = target.selectionEnd = start + 1;
  }
};

const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/gif'];

const onDrop = async (
  e: React.DragEvent<HTMLTextAreaElement>,
  onFileDrop: (file: File) => Promise<string>,
  setIsDragOver: (isDragOver: boolean) => void,
) => {
  e.preventDefault();
  setIsDragOver(false);
  const file = e.dataTransfer.files[0];
  if (!ALLOWED_FILE_TYPES.includes(file.type)) return;
  const url = await onFileDrop(file);
  const target = e.target as HTMLTextAreaElement;
  const start = target.selectionStart;
  const end = target.selectionEnd;
  target.value = `${target.value.substring(0, start)}![](${url})${target.value.substring(end)}`;
  target.selectionStart = target.selectionEnd = start + 1;
};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ error, height, id, label, onFileDrop, placeholder, resize, rows, ...props }, ref) => {
    const [isDragOver, setIsDragOver] = useState(false);

    return (
      <div className={styles.wrapper}>
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
        <div className={styles.textareaWrapper}>
          <textarea
            className={clsx(styles.textarea, isDragOver && styles.dragOver)}
            placeholder={placeholder}
            {...props}
            ref={ref}
            style={{ height, resize: resize ? 'vertical' : 'none' }}
            rows={rows}
            onKeyDown={(e) => onKeyDown(e)}
            onDrop={(e) => onFileDrop && onDrop(e, onFileDrop, setIsDragOver)}
            onDragOver={() => onFileDrop && setIsDragOver(true)}
            onDragLeave={() => onFileDrop && setIsDragOver(false)}
          />
          {isDragOver && <span className={styles.dragOverText}>Drop image here</span>}
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
