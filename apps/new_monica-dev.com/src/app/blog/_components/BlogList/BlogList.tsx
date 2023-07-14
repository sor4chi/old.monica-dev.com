import Image from 'next/image';
import NextLink from 'next/link';
import { ArrowUpRight } from 'react-feather';

import { styles } from './BlogList.css';

import QiitaIcon from '@/assets/third-parties/qiita.png';
import ZennIcon from '@/assets/third-parties/zenn.png';
import { Main } from '@/components/layout/Main';
import { TransitionLink } from '@/components/logical/TransitionLink';
import { getEnMonthDay } from '@/utils/date';

const BLOG_PROVIDER = [
  {
    domain: 'zenn.dev',
    icon: ZennIcon,
  },
  {
    domain: 'qiita.com',
    icon: QiitaIcon,
  },
];

type InternalBlog = {
  type: 'internal';
  publishedAt: string;
  description: string;
  slug: string;
  title: string;
};

type ExternalBlog = {
  type: 'external';
  publishedAt: string;
  href: string;
  title: string;
  provider: string;
};

export const BlogList = ({ blogs }: { blogs: (InternalBlog | ExternalBlog)[] }) => {
  blogs.sort((a, b) => {
    if (a.publishedAt === undefined) return 1;
    if (b.publishedAt === undefined) return -1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const splitByYear = blogs.reduce<{ [key: string]: typeof blogs }>((acc, blog) => {
    const year = blog.publishedAt ? new Date(blog.publishedAt).getFullYear() : new Date().getFullYear();
    if (acc[year] === undefined) acc[year] = [];
    acc[year].push(blog);
    return acc;
  }, {});

  const sortedByYear = Object.entries(splitByYear).sort((a, b) => Number(b[0]) - Number(a[0]));

  return (
    <Main>
      {sortedByYear.map(([year, blogs]) => (
        <section key={year} className={styles.yearSection}>
          <h2 className={styles.year}>{year}</h2>
          <ul className={styles.list}>
            {blogs.map((blog) =>
              blog.type === 'internal' ? (
                <InternalBlogItem key={blog.slug} blog={blog} />
              ) : (
                <ExternalBlogItem key={blog.href} blog={blog} />
              ),
            )}
          </ul>
        </section>
      ))}
    </Main>
  );
};

const InternalBlogItem = ({ blog }: { blog: InternalBlog }) => {
  return (
    <li className={styles.item}>
      <TransitionLink href={`/blog/${blog.slug}`} className={styles.link}>
        <span>
          {blog.title}
          {blog.publishedAt && (
            <time dateTime={blog.publishedAt} className={styles.publishedAt}>
              {getEnMonthDay(new Date(blog.publishedAt))}
            </time>
          )}
        </span>
      </TransitionLink>
    </li>
  );
};

const ExternalBlogItem = ({ blog }: { blog: ExternalBlog }) => {
  const matchedProvider = BLOG_PROVIDER.find((p) => blog.provider.includes(p.domain));
  return (
    <li className={styles.item}>
      <NextLink href={blog.href} className={styles.link}>
        <span>
          {blog.title}
          <time dateTime={blog.publishedAt} className={styles.publishedAt}>
            {getEnMonthDay(new Date(blog.publishedAt))}
          </time>
        </span>

        <ArrowUpRight strokeWidth={1.5} size="1.5em" className={styles.navigationIcon} />
        <span className={styles.linkDetail}>
          {matchedProvider && (
            <Image
              src={matchedProvider.icon}
              alt={`Icon of ${matchedProvider.domain}`}
              width={24}
              height={24}
              className={styles.linkIcon}
            />
          )}
          {blog.provider}
        </span>
      </NextLink>
    </li>
  );
};
