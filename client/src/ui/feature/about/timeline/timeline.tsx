import { useState } from 'react';

import * as styles from './timeline.css';

import { Checkbox } from '@/ui/foundation/checkbox';
import { TimelineList } from '@/ui/foundation/timeline';
import { getSafelyDate } from '@/util/date';

const TABS = [
  {
    blog: {
      slug: 'blog-title',
      title: 'これは技術ブログのタイトルです',
    },
    category: 'other',
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
    category: 'other',
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
  // extract categories from TABS, but 'other' category must be the end of the array
  const categories = TABS.reduce((acc, cur) => {
    if (!acc.includes(cur.category)) {
      console.log(cur.category);
      return cur.category === 'other' ? [...acc, cur.category] : [cur.category, ...acc];
    }
    return acc;
  }, [] as string[]);
  const [checkedCategories, setCheckedCategories] = useState(categories);
  const filteredTabs = TABS.filter((tab) => checkedCategories.includes(tab.category));
  const tabsSplitByYear = filteredTabs.reduce((acc, cur) => {
    const year = getSafelyDate(cur.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(cur);
    return acc;
  }, {} as Record<string, any[]>);
  const sortedEntries = Object.entries(tabsSplitByYear).sort((a, b) => Number(b[0]) - Number(a[0]));

  return (
    <div className={styles.wrapper}>
      <details>
        <summary>Sort by category</summary>
        <div className={styles.sorter}>
          {categories.map((category) => (
            <Checkbox
              key={category}
              label={category}
              id={category}
              checked={checkedCategories.includes(category)}
              onChange={(e) => {
                if (e.target.checked) {
                  setCheckedCategories([...checkedCategories, category]);
                } else {
                  setCheckedCategories(checkedCategories.filter((checkedCategory) => checkedCategory !== category));
                }
              }}
            />
          ))}
        </div>
      </details>
      {sortedEntries.map(([year, timelines]) => (
        <section key={year} className={styles.section}>
          <h3 className={styles.year}>{year}</h3>
          <TimelineList timelines={timelines} />
        </section>
      ))}
    </div>
  );
};
