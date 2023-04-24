import { clsx } from 'clsx';
import Link from 'next/link';

import { Card } from '../card';

import * as styles from './timeline-item.css';

import { parseTwemoji } from '@/lib/twemoji';
import { formatDateToHowPastFromNow } from '@/util/date';

interface Props {
  date: string;
  title: string;
  category: string;
  additional?: string;
  link?: string;
  isLast: boolean;
  blog?: {
    title: string;
    slug: string;
  };
}

const KNOWN_CATEGORIES: Record<string, { emoji: string; template?: string }> = {
  award: {
    emoji: '🏆',
    template: 'Got an award at %s',
  },
  blog: {
    emoji: '📝',
    template: 'Published a blog on %s',
  },
  education: {
    emoji: '🎓',
  },
  product: {
    emoji: '🎉',
    template: 'Released %s',
  },
  work: {
    emoji: '💼',
  },
};

const replaceTemplate = (template: string, input: string, link?: string) => {
  const splitted = template.split('%s');
  return (
    <>
      {splitted[0]}
      {link ? (
        <Link href={link} passHref className={styles.timelineItemHighlightLink}>
          {input}
        </Link>
      ) : (
        <span className={styles.timelineItemHighlight}>{input}</span>
      )}
    </>
  );
};

export const TimelineItem = ({ additional, blog, category, date, isLast, link, title }: Props) => {
  const isKnownCategory = KNOWN_CATEGORIES.hasOwnProperty(category);
  const emoji = isKnownCategory ? KNOWN_CATEGORIES[category].emoji : '';
  const displayTitle = category === 'blog' ? blog?.title : title;
  return (
    <div className={styles.timelineItem}>
      <h4 className={styles.timelineItemSubTitle}>
        {!blog && <span className={styles.timelineItemInlineTitle}>{displayTitle}</span>}
        {additional && (
          <span className={styles.timelineItemCategoryTemplate}>
            {replaceTemplate(KNOWN_CATEGORIES[category]?.template || '%s', additional, link)}
          </span>
        )}
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
