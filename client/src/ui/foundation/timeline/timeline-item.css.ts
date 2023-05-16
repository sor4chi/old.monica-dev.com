import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

const _TIMELINE_SUB_TITLE_LINE_HEIGHT = 1.5;
const TIMELINE_SUB_TITLE_LINE_HEIGHT = `${_TIMELINE_SUB_TITLE_LINE_HEIGHT}rem`;
const _TIMELINE_SUB_TITLE_VERTICAL_PADDING = 0.75;
const TIMELINE_SUB_TITLE_VERTICAL_PADDING = `${_TIMELINE_SUB_TITLE_VERTICAL_PADDING}rem`;
const _TIMELINE_COMMON_SPACE = _TIMELINE_SUB_TITLE_LINE_HEIGHT + _TIMELINE_SUB_TITLE_VERTICAL_PADDING * 2;
const TIMELINE_COMMON_SPACE = `${_TIMELINE_COMMON_SPACE}rem`;
const TIMELINE_POINT_SIZE = '.5rem';
const TIMELINE_POINT_WITH_ICON_SIZE = '2rem';

export const timelineItem = style({
  position: 'relative',
  paddingLeft: TIMELINE_COMMON_SPACE,
});

export const timelineItemPoint = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  top: 0,
  left: 0,
  position: 'absolute',
  fontSize: '1.5rem',
});

export const timelineItemPointWithIcon = style({
  width: TIMELINE_POINT_WITH_ICON_SIZE,
  height: TIMELINE_POINT_WITH_ICON_SIZE,
  fontSize: '1.25rem',
  transform: `translate(calc((${TIMELINE_COMMON_SPACE} - ${TIMELINE_POINT_WITH_ICON_SIZE}) / 2), calc((${TIMELINE_COMMON_SPACE} - ${TIMELINE_POINT_WITH_ICON_SIZE}) / 2))`,
  backgroundColor: vars.color.bg.primary,
  transition: 'background-color 0.2s ease-in-out',
});

export const timelineItemPointWithoutIcon = style({
  backgroundColor: vars.color.bg.tertiary,
  border: `0.25rem solid ${vars.color.bg.primary}`,
  width: TIMELINE_POINT_SIZE,
  height: TIMELINE_POINT_SIZE,
  transform: `translate(calc(${TIMELINE_COMMON_SPACE} / 2 - ${TIMELINE_POINT_SIZE}), calc(${TIMELINE_COMMON_SPACE} / 2 - ${TIMELINE_POINT_SIZE}))`,
  transition: 'background-color 0.2s ease-in-out',
});

export const timelineItemInner = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  justifyContent: 'space-between',
  padding: '1rem',
  textDecoration: 'none',
  transition: 'background-color 0.2s ease-in-out',
  borderRadius: 'inherit',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        backgroundColor: vars.color.bg.primary,
      },
    },
  },
});

export const timelineItemSubTitle = style({
  fontSize: '.9rem',
  lineHeight: TIMELINE_SUB_TITLE_LINE_HEIGHT,
  padding: `${TIMELINE_SUB_TITLE_VERTICAL_PADDING} 0`,
  margin: 0,
  fontWeight: 400,
  wordSpacing: '0.1em',
  color: vars.color.text.secondary,
});

export const timelineItemHighlight = style({
  color: vars.color.text.primary,
  fontWeight: 500,
});

export const timelineItemHighlightLink = style({
  color: vars.color.text.primary,
  textDecoration: 'none',
  fontWeight: 500,

  '@media': {
    '(hover: hover)': {
      ':hover': {
        textDecoration: 'underline',
      },
    },
  },
});

export const timelineItemDate = style({
  display: 'inline-block',
  color: vars.color.text.tertiary,
});

export const timelineItemTitle = style({
  fontSize: '1rem',
  margin: 0,
  fontWeight: 400,
  color: vars.color.text.primary,
});

export const timelineItemInlineTitle = style([
  timelineItemTitle,
  {
    marginRight: '.5rem',
    display: 'inline',
  },
]);

export const timelineItemCategoryTemplate = style({
  margin: '0 .5rem',
});

export const timelineItemIcon = style({
  color: vars.color.text.primary,
});

export const timelineItemLine = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '2px',
  height: '100%',
  backgroundColor: vars.color.bg.tertiary,
  transform: `translate(calc((${TIMELINE_COMMON_SPACE} - 2px) / 2), calc((${TIMELINE_COMMON_SPACE} - 2px) / 2))`,
  zIndex: -1,
  transition: 'background-color 0.2s ease-in-out',
});

export const timelineItemOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backdropFilter: 'blur(0)',
  borderRadius: '0.25rem',
  cursor: 'pointer',
  zIndex: 99,
  opacity: 0,
  transition: 'backdrop-filter 0.2s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2rem',

  ':hover': {
    backdropFilter: 'blur(1rem)',
    opacity: 1,
    transition: 'backdrop-filter 0.2s ease-in-out',
  },
});

export const timelineItemOverlayActions = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
});
