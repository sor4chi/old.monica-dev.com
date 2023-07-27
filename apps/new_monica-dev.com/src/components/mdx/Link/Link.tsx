import { clsx } from 'clsx';
import NextLink from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { ArrowUpRight } from 'react-feather';

import { styles } from './Link.css';

import { TransitionLink } from '@/components/logic/TransitionLink';

export const Link = ({ children, className, href, ...props }: ComponentPropsWithoutRef<'a'>) => {
  const isExternal = href?.startsWith('http');
  const isHash = href?.startsWith('#');

  if (isExternal) {
    return (
      <a className={clsx(styles.link, className)} target="_blank" rel="noopener noreferrer" href={href} {...props}>
        <span className={styles.linkText}>{children}</span>
        <ArrowUpRight strokeWidth={1.5} size="1.25em" className={styles.externalLinkIcon} />
      </a>
    );
  }

  if (isHash) {
    return (
      <NextLink href={href as string} className={clsx(styles.link, className)} {...props}>
        <span className={styles.linkText}>{children}</span>
      </NextLink>
    );
  }

  return (
    <TransitionLink href={href as string} className={clsx(styles.link, className)} {...props}>
      <span className={styles.linkText}>{children}</span>
    </TransitionLink>
  );
};
