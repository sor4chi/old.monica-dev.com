import Image from 'next/image';
import NextLink from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'react-feather';

import { styles } from './BlogList.css';

import QiitaIcon from '@/assets/third-parties/qiita.png';
import ZennIcon from '@/assets/third-parties/zenn.png';
import { TransitionLink } from '@/components/logical/TransitionLink';
import { Link } from '@/components/ui/Link';
import { getMonthDay } from '@/utils/date';

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
  publishedAt: string | undefined;
  description: string | undefined;
  slug: string;
  thumbnail: string | undefined;
  title: string | undefined;
};

type ExternalBlog = {
  publishedAt: string;
  href: string;
  title: string;
  provider: string;
};

export const BlogList = ({
  externalBlogs,
  internalBlogs,
}: {
  internalBlogs: InternalBlog[];
  externalBlogs: ExternalBlog[];
}) => {
  const mergedBlogs = [
    ...internalBlogs.map((blog) => ({ ...blog, type: 'internal' as const })),
    ...externalBlogs.map((blog) => ({ ...blog, type: 'external' as const })),
  ].sort((a, b) => {
    if (a.publishedAt === undefined) return 1;
    if (b.publishedAt === undefined) return -1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const splitByYear = mergedBlogs.reduce<{ [key: string]: typeof mergedBlogs }>((acc, blog) => {
    const year = blog.publishedAt ? new Date(blog.publishedAt).getFullYear() : new Date().getFullYear();
    if (acc[year] === undefined) acc[year] = [];
    acc[year].push(blog);
    return acc;
  }, {});

  const sortedSplitByYear = Object.entries(splitByYear).sort((a, b) => Number(b[0]) - Number(a[0]));

  return (
    <>
      <div className={styles.nav}>
        <Link tag={TransitionLink} href="/">
          <ArrowLeft strokeWidth={1.5} size="1em" />
          Back
        </Link>
      </div>
      <div className={styles.content}>
        {sortedSplitByYear.map(([year, blogs]) => (
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
      </div>
    </>
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
              {getMonthDay(new Date(blog.publishedAt))}
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
            {getMonthDay(new Date(blog.publishedAt))}
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
