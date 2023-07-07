import { style } from '@vanilla-extract/css';

export const tabContentWrapper = style({
  width: '100%',
  overflow: 'hidden',
});

export const TAB_CONTENT_GAP = '1rem';

export const tabContent = style({
  display: 'flex',
  gap: TAB_CONTENT_GAP,
  transition: 'transform 0.3s ease-in-out',
});

export const tabContentItem = style({
  width: '100%',
  transition: 'opacity 0.2s ease-in-out',
});
