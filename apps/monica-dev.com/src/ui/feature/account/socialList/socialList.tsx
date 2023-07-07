import Link from 'next/link';

import * as styles from './socialList.css';

import { SITE_CONFIG } from '@/constant/site';
import { Github, Twitter } from '@/ui/icons';

const socials = {
  github: {
    href: `https://github.com/${SITE_CONFIG.SOCIAL.GITHUB_ID}`,
    Icon: Github,
    id: SITE_CONFIG.SOCIAL.GITHUB_ID,
  },
  twitter: {
    href: `https://twitter.com/${SITE_CONFIG.SOCIAL.TWITTER_ID}`,
    Icon: Twitter,
    id: SITE_CONFIG.SOCIAL.TWITTER_ID,
  },
} as const;

const typedEntries = Object.entries as <T>(o: T) => [keyof T, T[keyof T]][];

interface Props {
  id?: boolean;
}

export const SocialList = ({ id = false }: Props) => (
  <div className={styles.socials}>
    {typedEntries(socials).map(([name, { href, Icon }]) => (
      <Link href={href} key={name} passHref aria-label={name} className={styles.social[name]}>
        <Icon className={styles.socialIcon} />
        {id && <span className={styles.socialId}>{socials[name].id}</span>}
      </Link>
    ))}
  </div>
);
