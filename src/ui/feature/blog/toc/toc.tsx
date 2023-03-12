import { clsx } from 'clsx';
import { useEffect, useRef } from 'react';

import * as styles from './toc.css';

export interface TocItemProps {
  depth: number;
  value: string;
  data: {
    id: string;
  };
  children: TocItemProps[];
}

const TocItem = ({ children, data, depth, value }: TocItemProps) => {
  const observer = useRef<IntersectionObserver>();
  const toc = useRef<HTMLAnchorElement>(null);
  const targetId = `#${data.id}`;

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

    // probably, targetId starts with '#[0-9]', so try-catch is needed
    try {
      const heading = document.querySelector(targetId);
      if (heading && observer.current) {
        observer.current.observe(heading);
      }
    } catch (e) {
      console.error(e);
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
    <section className={styles.toc}>
      <p className={styles.tocTitle}>目次</p>
      {toc.length === 0 && <p>目次はありません</p>}
      {toc.map((toc) => (
        <TocItem {...toc} key={toc.value} />
      ))}
    </section>
  );
};
