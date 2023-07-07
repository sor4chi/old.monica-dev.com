import { clsx } from 'clsx';
import Link from 'next/link';

import { Card } from '../card';
import { IconButton } from '../icon-button';

import * as styles from './timeline-item.css';

import { TIMELINE_CATEGORIES } from '@/constant/timeline';
import { gql } from '@/lib/graphql';
import { parseTwemoji } from '@/lib/twemoji';
import { PencilSquare, Trash } from '@/ui/icons';
import { formatDateToHowPastFromNow } from '@/util/date';

export const TimelineItemFragment = gql`
  fragment TimelineItemFragment on Timeline {
    id
    date
    title
    category
    blog {
      id
      title
      slug
    }
  }
`;

export type TimelineItemFragmentResponse = {
  id: number;
  date: string;
  title: string;
  category: string;
  blog: {
    id?: number;
    title: string;
    slug: string;
  } | null;
};

interface Props {
  isLast: boolean;
  timelineItem: TimelineItemFragmentResponse;
  onClick?: (id: number, mode: 'edit' | 'delete') => void;
}

export const TimelineItem = ({ isLast, onClick, timelineItem }: Props) => {
  const { blog, category, date, title } = timelineItem;
  const isKnownCategory = TIMELINE_CATEGORIES.hasOwnProperty(category);
  const emoji = isKnownCategory ? TIMELINE_CATEGORIES[category].emoji : '';
  const displayHead = category === 'blog' ? 'published a new blog' : title;

  return (
    <div className={clsx(styles.timelineItem)}>
      <h4 className={styles.timelineItemSubTitle}>
        <span className={styles.timelineItemInlineTitle}>{displayHead}</span>
        <span className={styles.timelineItemDate}>{formatDateToHowPastFromNow(date)}</span>
      </h4>
      {blog && (
        <Card padding="no">
          <Link className={styles.timelineItemInner} href={`/blog/${blog.slug}`} passHref>
            <h3 className={styles.timelineItemTitle}>{blog.title}</h3>
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
      {onClick && (
        <div className={styles.timelineItemOverlay}>
          <p>{title}</p>
          <div className={styles.timelineItemOverlayActions}>
            <IconButton label="edit" onClick={() => onClick?.(timelineItem.id, 'edit')}>
              <PencilSquare className={styles.timelineItemOverlayActionIcon} />
            </IconButton>
            <IconButton label="delete" variant="danger" onClick={() => onClick?.(timelineItem.id, 'delete')}>
              <Trash className={styles.timelineItemOverlayActionIcon} />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};
