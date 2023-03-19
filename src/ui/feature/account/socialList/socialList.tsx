import Link from 'next/link';
import { FaGithub, FaTwitter } from 'react-icons/fa';

import * as styles from './socialList.css';

import { SITE_CONFIG } from '@/constant/site';

const socials = {
  github: {
    href: `https://github.com/${SITE_CONFIG.SOCIAL.GITHUB_ID}`,
    Icon: FaGithub,
    id: SITE_CONFIG.SOCIAL.GITHUB_ID,
  },
  twitter: {
    href: `https://twitter.com/${SITE_CONFIG.SOCIAL.TWITTER_ID}`,
    Icon: FaTwitter,
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
        <Icon size="1.5em" className={styles.socialIcon} />
        {id && <span className={styles.socialId}>{socials[name].id}</span>}
      </Link>
    ))}
  </div>
);
