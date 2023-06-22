import Link from 'next/link';
import { useRouter } from 'next/navigation';

import type { BlogShareFragmentResponse } from './query';
import * as styles from './share.css';

import { ROUTES } from '@/constant/route';
import { SITE_CONFIG } from '@/constant/site';
import { useSession } from '@/hooks';
import { vars } from '@/style/theme.css';
import { Button } from '@/ui/foundation/button';
import { ArrowUp, Facebook, PencilSquare, Twitter } from '@/ui/icons';

const twitterShareUrl = (url: string, text: string) => {
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
};

const facebookShareUrl = (url: string) => {
  return `https://www.facebook.com/share.php?u=${encodeURIComponent(url)}`;
};

type Props = BlogShareFragmentResponse;

export const BlogShare = ({ id, slug, title }: Props) => {
  const state = useSession();
  const router = useRouter();

  return (
    <div className={styles.shares}>
      <a href="#" className={styles.social}>
        <ArrowUp color={vars.color.text.tertiary} className={styles.icon} />
      </a>
      <Link
        href={twitterShareUrl(SITE_CONFIG.URL + ROUTES.BLOG_ARTICLE(slug), title + ' | ' + SITE_CONFIG.TITLE + '\n')}
        aria-label="Share on Twitter"
        passHref
        className={styles.social}
      >
        <Twitter color={vars.color.social.twitter} className={styles.icon} />
      </Link>
      <Link
        href={facebookShareUrl(SITE_CONFIG.URL + ROUTES.BLOG_ARTICLE(slug))}
        aria-label="Share on Facebook"
        passHref
        className={styles.social}
      >
        <Facebook className={styles.icon} />
      </Link>
      {state === 'authenticated' && (
        <Button
          icon={<PencilSquare className={styles.icon} />}
          onClick={() => router.push(ROUTES.DASHBOARD_BLOG_EDIT(id))}
          variant="tertiary"
        >
          Edit
        </Button>
      )}
    </div>
  );
};
