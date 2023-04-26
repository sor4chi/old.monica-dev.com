import { style } from '@vanilla-extract/css';

export const tabContentWrapper = style({
  width: '100%',
  overflow: 'hidden',
  margin: '1rem auto',
});

export const TAB_CONTENT_GAP = '1rem';

export const tabContent = style({
  display: 'flex',
  gap: TAB_CONTENT_GAP,
  transition: 'transform 0.3s cubic-bezier(1, 0, 0, 1)',
});

export const tabContentItem = style({
  width: '100%',
  height: 'max-content',
  transition: 'opacity 0.15s cubic-bezier(1, 0, 0, 1)',
});
