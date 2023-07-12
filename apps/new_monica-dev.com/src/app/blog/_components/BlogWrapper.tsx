import Image from 'next/image';
import NextLink from 'next/link';
import { ArrowLeft } from 'react-feather';

import { styles } from './BlogWrapper.css';

import { Link } from '@/ui/Link';

export const BlogWrapper = ({
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
        <Link tag={NextLink} href="/blog">
          <ArrowLeft strokeWidth={1.5} size={16} />
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
            width={1280}
            height={720}
            priority
            loading="eager"
          />
        )}
        {children}
      </div>
    </>
  );
};
