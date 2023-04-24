import * as styles from './timeline.css';

import { TimelineList } from '@/ui/foundation/timeline';

const TABS = [
  {
    blog: {
      slug: 'blog-title',
      title: 'これは技術ブログのタイトルです',
    },
    category: 'unknown',
    date: '2021-01-01',
    title: 'Timeline List Title',
  },
  {
    category: 'award',
    date: '2021-01-01',
    title: 'Timeline List Title',
  },
  {
    blog: {
      slug: 'blog-title',
      title: 'これは技術ブログのタイトルです',
    },
    category: 'blog',
    date: '2021-01-01',
    title: 'Timeline List Title',
  },
  {
    category: 'education',
    date: '2021-01-01',
    title: 'Timeline List Title',
  },
  {
    blog: {
      slug: 'blog-title',
      title: 'これは技術ブログのタイトルです',
    },
    category: 'product',
    date: '2021-01-01',
    title: 'Timeline List Title',
  },
  {
    category: 'work',
    date: '2021-01-01',
    title: 'Timeline List Title',
  },
  {
    blog: {
      slug: 'blog-title',
      title: 'これは技術ブログのタイトルです',
    },
    category: 'unknown',
    date: '2022-01-01',
    title: 'Timeline List Title',
  },
  {
    category: 'award',
    date: '2022-01-01',
    title: 'Timeline List Title',
  },
  {
    blog: {
      slug: 'blog-title',
      title: 'これは技術ブログのタイトルです',
    },
    category: 'blog',
    date: '2022-01-01',
    title: 'Timeline List Title',
  },
  {
    category: 'education',
    date: '2022-01-01',
    title: 'Timeline List Title',
  },
  {
    blog: {
      slug: 'blog-title',
      title: 'これは技術ブログのタイトルです',
    },
    category: 'product',
    date: '2022-01-01',
    title: 'Timeline List Title',
  },
  {
    category: 'work',
    date: '2022-01-01',
    title: 'Timeline List Title',
  },
];

export const Timeline = () => {
  const tabsSplitByYear = TABS.reduce((acc, cur) => {
    const year = new Date(cur.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(cur);
    return acc;
  }, {} as Record<string, any[]>);
  const sortedEntries = Object.entries(tabsSplitByYear).sort((a, b) => Number(b[0]) - Number(a[0]));

  return (
    <div className={styles.wrapper}>
      {sortedEntries.map(([year, timelines]) => (
        <section key={year} className={styles.section}>
          <h3 className={styles.year}>{year}</h3>
          <TimelineList timelines={timelines} />
        </section>
      ))}
    </div>
  );
};
