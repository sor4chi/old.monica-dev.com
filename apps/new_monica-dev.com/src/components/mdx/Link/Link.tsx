import type { ComponentPropsWithoutRef } from 'react';
import { ArrowUpRight } from 'react-feather';

import { styles } from './Link.css';

import { TransitionLink } from '@/components/logical/TransitionLink';
import { vars } from '@/styles/theme.css';

export const Link = ({ children, href, ...props }: ComponentPropsWithoutRef<'a'>) => {
  const isExternal = href?.startsWith('http');

  if (isExternal) {
    return (
      <a className={styles.link} target="_blank" rel="noopener noreferrer" href={href} {...props}>
        {children}
        <ArrowUpRight strokeWidth={1.5} size={vars.font.size.xl} className={styles.externalLinkIcon} />
      </a>
    );
  }

  return (
    <TransitionLink href={href as string} className={styles.link} {...props}>
      {children}
    </TransitionLink>
  );
};
