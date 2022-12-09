'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { parseHTMLToReactJSX } from '#/lib/markdown';
import { ParsedMarkdown } from '#/types/markdown';
import { Timeline } from '#/types/timeline';
import { dateToPassedTimeByNow } from '#/utils/date';

interface Props {
  timeline: Timeline & { md: ParsedMarkdown };
  last?: boolean;
}

export const TimelineCard = ({ timeline, last }: Props) => {
  const MAX_CARD_HEIGHT = 300;
  const cardRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      setOverflow(cardRef.current.clientHeight > MAX_CARD_HEIGHT);
    }
  }, []);

  return (
    <div className={clsx(`ml-[theme(sizes.timelineBarAreaWidth)]`, 'relative')}>
      {last || (
        <span
          className={clsx(
            `w-[theme(sizes.timelineBarWidth)] h-[calc(100%_+_theme(sizes.timelineCardGap))]`,
            'bg-gray-400 block',
            `left-[calc(-1_*_(theme(sizes.timelineBarAreaWidth)_/_2_+_theme(sizes.timelineBarWidth)_/_2))]`,
            'top-[calc(theme(lineHeights.timelineLabel)_/_2)]',
            'absolute',
          )}
        />
      )}
      <span
        className={clsx(
          `w-[theme(sizes.timelinePoint)] h-[theme(sizes.timelinePoint)]`,
          'bg-gray-400 block rounded-full',
          `left-[calc(-1_*_(theme(sizes.timelineBarAreaWidth)_/_2_+_theme(sizes.timelinePoint)_/_2))]`,
          'top-[calc(theme(lineHeights.timelineLabel)_/_2_-_theme(sizes.timelinePoint)_/_2)]',
          'absolute',
          'border border-slate-100 dark:border-neutral-900',
        )}
      />
      <div className="flex flex-col">
        <span
          className={clsx(
            'leading-[theme(lineHeights.timelineLabel)]',
            'text-neutral-500 dark:text-neutral-400',
            'text-sm font-medium',
          )}
        >
          {dateToPassedTimeByNow(timeline.date)}
        </span>
        <div className={clsx('common-card', 'p-4')}>
          <div
            className={clsx(overflow ? 'max-h-[300px] overflow-hidden' : '')}
            ref={cardRef}
          >
            {timeline.md.content && (
              <div
                className={clsx(
                  'use-markdown',
                  'prose-h1:text-xl prose-h2:text-lg prose-h3:text-base',
                )}
              >
                {parseHTMLToReactJSX(timeline.md.content)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
