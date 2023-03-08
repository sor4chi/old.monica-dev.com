import { clsx } from 'clsx';
import { useEffect, useRef } from 'react';

import * as styles from './toc.css';
import type { TocItemProps } from './types';

const TocItem = ({ children, depth, value }: TocItemProps) => {
  const observer = useRef<IntersectionObserver>();
  const toc = useRef<HTMLAnchorElement>(null);
  const targetId = `#${value}`;

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!toc.current) return;
        if (entry.isIntersecting) {
          toc.current.classList.add(styles.tocActive);
        } else {
          toc.current.classList.remove(styles.tocActive);
        }
      });
    });

    const heading = document.querySelector(targetId);
    if (heading && observer.current) {
      observer.current.observe(heading);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <ul className={clsx(styles.tocWrapper, depth <= 2 && styles.tocTop)}>
      <li className={styles.tocItem}>
        <a href={targetId} className={styles.tocItemLink} ref={toc}>
          {value}
        </a>
      </li>
      {children.map((child) => (
        <TocItem {...child} key={child.value} />
      ))}
    </ul>
  );
};

export const Toc = ({ toc }: { toc: TocItemProps[] }) => {
  return (
    <div className={styles.toc}>
      <h2>目次</h2>
      {toc.length === 0 && <p>目次はありません</p>}
      {toc.map((toc) => (
        <TocItem {...toc} key={toc.value} />
      ))}
    </div>
  );
};
