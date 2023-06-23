import Image from 'next/image';
import NextLink from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import type { LinkMeta } from 'remark-link-meta/dist/types';

import * as styles from './link.css';

import { SITE_CONFIG } from '@/constant/site';
import { Anchor } from '@/ui/foundation/anchor';

type Props = ComponentPropsWithoutRef<'a'> & {
  href: string;
  title?: LinkMeta['title'];
  description?: LinkMeta['description'];
  thumbnailurl?: LinkMeta['thumbnailUrl'];
  iconurl?: LinkMeta['iconUrl'];
};

const getDomain = (url: string) => {
  const domain = url.match(/https?:\/\/([^/]+)/);
  return domain ? domain[1] : '';
};

const INTERNAL_LINK_RE = /^[\/#].*/;

export const Link = (props: Props) => {
  if (props.title) {
    return (
      <NextLink
        href={props.href}
        className={styles.container}
        rel={
          INTERNAL_LINK_RE.test(props.href) || props.href.startsWith(SITE_CONFIG.URL)
            ? undefined
            : 'noopener noreferrer'
        }
        target={INTERNAL_LINK_RE.test(props.href) || props.href.startsWith(SITE_CONFIG.URL) ? undefined : '_blank'}
      >
        <span className={styles.content}>
          <span className={styles.title}>{props.title}</span>
          <span className={styles.description}>{props.description}</span>
          <span className={styles.domain}>
            <Image src={props.iconurl || ''} alt={props.title} width={16} height={16} />
            {getDomain(props.href)}
          </span>
        </span>
        <Image src={props.thumbnailurl || ''} alt={props.title} width={240} height={126} className={styles.thumbnail} />
      </NextLink>
    );
  }

  return <Anchor {...props} />;
};
