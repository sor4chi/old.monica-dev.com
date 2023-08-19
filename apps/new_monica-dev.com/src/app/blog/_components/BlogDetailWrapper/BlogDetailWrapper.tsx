import Image from 'next/image';
import NextLink from 'next/link';
import { ArrowLeft } from 'react-feather';

import { styles } from './BlogDetailWrapper.css';

import { TransitionLink } from '@/components/logic/TransitionLink';
import { Link } from '@/components/ui/Link';
import { Toc } from '@/lib/remark/extractToc';
import { getEnYearMonthDay } from '@/utils/date';

export const BlogDetailWrapper = ({
  children,
  date,
  thumbnail,
  title,
  toc,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  date: string;
  thumbnail?: string;
  toc: Toc;
}) => {
  return (
    <div className={styles.container}>
      <aside className={styles.asideLeft}>
        <Link tag={TransitionLink} animation="backward" href="/blog">
          <ArrowLeft strokeWidth={1.5} size="1em" />
          Back
        </Link>
        <Toc toc={toc} />
      </aside>
      <div className={styles.content}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>{title}</h1>
          <span className={styles.heroDate}>
            <time className={styles.heroDate} dateTime={date}>
              {getEnYearMonthDay(new Date(date))}
            </time>
          </span>
        </div>
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
        <article className={styles.article}>{children}</article>
      </div>
      <aside className={styles.asideRight}></aside>
    </div>
  );
};

const Toc = ({ toc }: { toc: Toc }) => {
  return (
    <ul className={styles.toc}>
      {toc.map((tocItem) => (
        <li className={styles.tocItem} key={tocItem.id}>
          <Link tag={NextLink} href={`#${tocItem.id}`} expand>
            {tocItem.text}
          </Link>
          {tocItem.children.length > 0 && <Toc toc={tocItem.children} />}
        </li>
      ))}
    </ul>
  );
};
