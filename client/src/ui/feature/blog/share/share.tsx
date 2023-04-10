import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEdit, FaFacebook, FaTwitter } from 'react-icons/fa';

import * as styles from './share.css';

import { ROUTES } from '@/constant/route';
import { SITE_CONFIG } from '@/constant/site';
import { useSession } from '@/hooks';
import { vars } from '@/style/theme.css';
import { Button } from '@/ui/foundation/button';

const twitterShareUrl = (url: string, text: string) => {
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
};

const facebookShareUrl = (url: string) => {
  return `https://www.facebook.com/share.php?u=${encodeURIComponent(url)}`;
};

interface Props {
  id: number;
  title: string;
}

export const Share = ({ id, title }: Props) => {
  const state = useSession();
  const router = useRouter();

  return (
    <div className={styles.shares}>
      <Link
        href={twitterShareUrl(SITE_CONFIG.URL, title)}
        aria-label="Share on Twitter"
        passHref
        className={styles.social}
      >
        <FaTwitter color={vars.color.social.twitter} />
      </Link>
      <Link href={facebookShareUrl(SITE_CONFIG.URL)} aria-label="Share on Facebook" passHref className={styles.social}>
        <FaFacebook color={vars.color.social.facebook} />
      </Link>
      {state === 'authenticated' && (
        <Button icon={<FaEdit />} onClick={() => router.push(ROUTES.DASHBOARD_BLOG_EDIT(id))} variant="tertiary">
          Edit
        </Button>
      )}
    </div>
  );
};