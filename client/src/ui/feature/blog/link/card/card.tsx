'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { LinkMeta } from 'remark-link-meta/dist/types';

import * as styles from './card.css';

import { SITE_CONFIG } from '@/constant/site';

const getDomain = (url: string) => {
  const domain = url.match(/https?:\/\/([^/]+)/);
  return domain ? domain[1] : '';
};

const INTERNAL_LINK_RE = /^[\/#].*/;

interface Props {
  title: string;
  href: string;
  description?: LinkMeta['description'];
  thumbnailurl?: LinkMeta['thumbnailUrl'];
  iconurl?: LinkMeta['iconUrl'];
}

export const LinkCard = ({ description, href, iconurl, thumbnailurl, title }: Props) => {
  const [isIconLoadSuccess, setIsIconLoadSuccess] = useState(true);
  const [isThumbnailLoadSuccess, setIsThumbnailLoadSuccess] = useState(true);

  return (
    <Link
      href={href}
      className={styles.container}
      rel={INTERNAL_LINK_RE.test(href) || href.startsWith(SITE_CONFIG.URL) ? undefined : 'noopener noreferrer'}
      target={INTERNAL_LINK_RE.test(href) || href.startsWith(SITE_CONFIG.URL) ? undefined : '_blank'}
    >
      <span className={styles.content}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
        <span className={styles.domain}>
          {isIconLoadSuccess && (
            <Image src={iconurl || ''} alt={title} width={16} height={16} onError={() => setIsIconLoadSuccess(false)} />
          )}
          {getDomain(href)}
        </span>
      </span>
      {isThumbnailLoadSuccess && (
        <Image
          src={thumbnailurl || ''}
          alt={title}
          width={240}
          height={126}
          className={styles.thumbnail}
          onError={() => setIsThumbnailLoadSuccess(false)}
        />
      )}
    </Link>
  );
};
