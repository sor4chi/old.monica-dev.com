import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import { ArrowUpRight } from 'react-feather';

import { styles } from './Link.css';

import { TransitionLink } from '@/components/logical/TransitionLink';

export const Link = ({ children, className, href, ...props }: ComponentPropsWithoutRef<'a'>) => {
  const isExternal = href?.startsWith('http');

  if (isExternal) {
    return (
      <a className={clsx(styles.link, className)} target="_blank" rel="noopener noreferrer" href={href} {...props}>
        <span className={styles.linkText}>{children}</span>
        <ArrowUpRight strokeWidth={1.5} size="1.25em" className={styles.externalLinkIcon} />
      </a>
    );
  }

  return (
    <TransitionLink href={href as string} className={clsx(styles.link, className)} {...props}>
      <span className={styles.linkText}>{children}</span>
    </TransitionLink>
  );
};
