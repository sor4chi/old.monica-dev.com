import Image from 'next/image';
import { ArrowLeft } from 'react-feather';

import { styles } from './BlogDetailWrapper.css';

import { TransitionLink } from '@/components/logical/TransitionLink';
import { Link } from '@/components/ui/Link';

export const BlogDetailWrapper = ({
  children,
  date,
  thumbnail,
  title,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  date: string;
  thumbnail?: string;
}) => {
  return (
    <>
      <div className={styles.nav}>
        <Link tag={TransitionLink} href="/blog">
          <ArrowLeft strokeWidth={1.5} size="1em" />
          Back
        </Link>
      </div>
      <div className={styles.hero}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.date}>{date}</p>
      </div>
      <div className={styles.content}>
        {thumbnail && (
          <Image
            className={styles.thumbnail}
            src={thumbnail}
            alt={title}
            width={640}
            height={360}
            priority
            loading="eager"
          />
        )}
        {children}
      </div>
    </>
  );
};
