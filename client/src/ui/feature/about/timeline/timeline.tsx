'use client';
import { useEffect, useMemo, useState } from 'react';

import * as styles from './timeline.css';

import { TIMELINE_CATEGORIES } from '@/constant/timeline';
import { Checkbox } from '@/ui/foundation/checkbox';
import type { TimelineItemFragmentResponse, TimelineListFragmentResponse } from '@/ui/foundation/timeline';
import { TimelineList } from '@/ui/foundation/timeline';
import { getSafelyDate } from '@/util/date';

interface Props {
  timelines: TimelineListFragmentResponse;
  onClick?: (id: number, mode: 'edit' | 'delete') => void;
}

export const Timeline = ({ onClick, timelines }: Props) => {
  const getCategories = (timelines: TimelineListFragmentResponse) =>
    timelines.reduce((acc, cur) => {
      if (!acc.includes(cur.category)) {
        return cur.category === 'other' ? [...acc, cur.category] : [cur.category, ...acc];
      }
      return acc;
    }, [] as string[]);

  const [checkedCategories, setCheckedCategories] = useState(getCategories(timelines));

  useEffect(() => {
    setCheckedCategories(getCategories(timelines));
  }, [timelines]);

  const tabsSplitByYear = useMemo(() => {
    const filteredTimeline = timelines.filter((timeline) => checkedCategories.includes(timeline.category));
    return filteredTimeline.reduce((acc, cur) => {
      const year = getSafelyDate(cur.date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(cur);
      return acc;
    }, {} as Record<string, TimelineItemFragmentResponse[]>);
  }, [checkedCategories, timelines]);

  const sortedEntries = useMemo(() => {
    return Object.entries(tabsSplitByYear).sort((a, b) => Number(b[0]) - Number(a[0]));
  }, [tabsSplitByYear]);

  const sumOfSortedEntries = sortedEntries.reduce((acc, cur) => acc + cur[1].length, 0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.sorter}>
        {getCategories(timelines).map((category) => (
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
          <TimelineList timelines={timelines} onClick={onClick} />
        </section>
      ))}
      {sumOfSortedEntries === 0 && <p className={styles.noItem}>No Timeline Item</p>}
    </div>
  );
};
