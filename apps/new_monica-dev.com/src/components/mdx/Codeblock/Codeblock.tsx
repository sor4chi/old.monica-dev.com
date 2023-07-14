'use client';
import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import React, { useRef, useState } from 'react';
import { Copy } from 'react-feather';

import { COPY_COOLDOWN, styles } from './Codeblock.css';

const getInnerText = (code: HTMLElement | null) => {
  if (!code) return '';
  return code.innerText;
};

export const Codeblock = ({ children, className, ...props }: ComponentPropsWithoutRef<'code'>) => {
  const preRef = useRef<HTMLPreElement>(null);
  const [isCopying, setIsCopying] = useState(false);

  const onCopyButtonClick = () => {
    if (isCopying) return;

    setIsCopying(true);
    navigator.clipboard.writeText(getInnerText((preRef.current as HTMLPreElement)?.querySelector('code')));
    preRef.current?.classList.add(styles.copied);

    setTimeout(() => {
      preRef.current?.classList.remove(styles.copied);
      setIsCopying(false);
    }, COPY_COOLDOWN);
  };

  return (
    <div className={styles.div}>
      <pre {...props} className={clsx(styles.pre, className)} ref={preRef}>
        <div className={styles.rightTopFloatArea}>
          <button onClick={onCopyButtonClick} className={styles.copyButton}>
            <Copy size="1.5em" strokeWidth={1.5} />
          </button>
        </div>
        {children}
      </pre>
    </div>
  );
};
