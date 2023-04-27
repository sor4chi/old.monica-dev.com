import { clsx } from 'clsx';
import Link from 'next/link';

import { Card } from '../card';

import * as styles from './timeline-item.css';

import { gql } from '@/lib/graphql';
import { parseTwemoji } from '@/lib/twemoji';
import { formatDateToHowPastFromNow } from '@/util/date';

export const TimelineItemFragment = gql`
  fragment TimelineItemFragment on Timeline {
    date
    title
    category
    blog {
      title
      slug
    }
  }
`;

export type TimelineItemFragmentResponse = {
  date: string;
  title: string;
  category: string;
  blog: {
    title: string;
    slug: string;
  } | null;
};

interface Props {
  isLast: boolean;
  timelineItem: TimelineItemFragmentResponse;
}

const KNOWN_CATEGORIES: Record<string, { emoji: string; template?: string }> = {
  award: {
    emoji: '🏆',
  },
  blog: {
    emoji: '📝',
  },
  education: {
    emoji: '🎓',
  },
  product: {
    emoji: '🎉',
  },
  work: {
    emoji: '💼',
  },
};

export const TimelineItem = ({ isLast, timelineItem }: Props) => {
  const { blog, category, date, title } = timelineItem;
  const isKnownCategory = KNOWN_CATEGORIES.hasOwnProperty(category);
  const emoji = isKnownCategory ? KNOWN_CATEGORIES[category].emoji : '';
  const displayTitle = category === 'blog' ? blog?.title : title;
  return (
    <div className={styles.timelineItem}>
      <h4 className={styles.timelineItemSubTitle}>
        <span className={styles.timelineItemInlineTitle}>{displayTitle}</span>
        <span className={styles.timelineItemDate}>{formatDateToHowPastFromNow(date)}</span>
      </h4>
      {blog && (
        <Card padding="no">
          <Link className={styles.timelineItemInner} href={`/blog/${blog.slug}`} passHref>
            <h3 className={styles.timelineItemTitle}>{displayTitle}</h3>
          </Link>
        </Card>
      )}
      <span
        className={clsx(
          styles.timelineItemPoint,
          isKnownCategory ? styles.timelineItemPointWithIcon : styles.timelineItemPointWithoutIcon,
        )}
        dangerouslySetInnerHTML={{
          __html: parseTwemoji(emoji || ''),
        }}
      ></span>
      {!isLast && <span className={styles.timelineItemLine}></span>}
    </div>
  );
};
