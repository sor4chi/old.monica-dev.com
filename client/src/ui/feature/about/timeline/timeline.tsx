'use client';
import { useState } from 'react';

import * as styles from './timeline.css';

import { TIMELINE_CATEGORIES } from '@/constant/timeline';
import { Checkbox } from '@/ui/foundation/checkbox';
import type { TimelineListFragmentResponse } from '@/ui/foundation/timeline';
import { TimelineList } from '@/ui/foundation/timeline';
import { getSafelyDate } from '@/util/date';

interface Props {
  timelines: TimelineListFragmentResponse;
}

export const Timeline = ({ timelines }: Props) => {
  // extract categories from TABS, but 'other' category must be the end of the array
  const categories = timelines.reduce((acc, cur) => {
    if (!acc.includes(cur.category)) {
      return cur.category === 'other' ? [...acc, cur.category] : [cur.category, ...acc];
    }
    return acc;
  }, [] as string[]);
  const [checkedCategories, setCheckedCategories] = useState(categories);
  const filteredTabs = timelines.filter((tab) => checkedCategories.includes(tab.category));
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
      <div className={styles.sorter}>
        {categories.map((category) => (
          <Checkbox
            key={category}
            label={TIMELINE_CATEGORIES[category] ? `${TIMELINE_CATEGORIES[category].emoji} ${category}` : category}
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

      {sortedEntries.map(([year, timelines]) => (
        <section key={year} className={styles.section}>
          <h3 className={styles.year}>{year}</h3>
          <TimelineList timelines={timelines} />
        </section>
      ))}
    </div>
  );
};
