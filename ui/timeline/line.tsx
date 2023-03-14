import clsx from 'clsx';

export const TimelineLine = () => (
  <span
    className={clsx(
      `h-[calc(100%_+_theme(sizes.timelineCardGap))] w-[theme(sizes.timelineBarWidth)]`,
      'block bg-gray-500 dark:bg-gray-400',
      `left-[calc(-1_*_(theme(sizes.timelineBarAreaWidth)_/_2_+_theme(sizes.timelineBarWidth)_/_2))]`,
      'top-[calc(theme(lineHeights.timelineLabel)_/_2)]',
      'absolute',
    )}
  />
);
