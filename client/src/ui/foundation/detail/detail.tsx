'use client';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

import * as styles from './detail.css';

interface Props {
  summary: string;
  children: ReactNode;
}

const closingKeyframes = (content: HTMLDivElement) => [
  {
    height: `${content.offsetHeight}px`,
    opacity: 1,
  },
  {
    height: 0,
    opacity: 0,
  },
];

const openingKeyframes = (content: HTMLDivElement) => [
  {
    height: 0,
    opacity: 0,
  },
  {
    height: `${content.offsetHeight}px`,
    opacity: 1,
  },
];

export const Detail = ({ children, summary }: Props) => {
  const [animateMutex, setAnimateMutex] = useState(false);
  const [rotateIcon, setRotateIcon] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    const content = contentRef.current;
    const details = detailsRef.current;
    if (!content || !details) return;
    if (animateMutex) return;

    if (details.open) {
      setAnimateMutex(true);
      setRotateIcon(false);
      const closing = content.animate(closingKeyframes(content), {
        duration: 300,
        easing: 'ease-in-out',
      });

      closing.onfinish = () => {
        setAnimateMutex(false);
        details.removeAttribute('open');
      };
    } else {
      setAnimateMutex(true);
      details.setAttribute('open', 'true');
      setRotateIcon(true);
      const opening = content.animate(openingKeyframes(content), {
        duration: 300,
        easing: 'ease-in-out',
      });

      opening.onfinish = () => {
        setAnimateMutex(false);
      };
    }
  };

  return (
    <details className={styles.details} ref={detailsRef}>
      <summary className={styles.summary} onClick={onClick}>
        <IoIosArrowForward
          className={styles.summaryIcon}
          style={{ transform: rotateIcon ? 'rotate(90deg)' : 'rotate(0deg)' }}
        />
        {summary}
      </summary>
      <div className={styles.content} ref={contentRef}>
        <div className={styles.contentInner}>{children}</div>
      </div>
    </details>
  );
};
