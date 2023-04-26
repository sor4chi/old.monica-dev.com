import { globalStyle, keyframes, style } from '@vanilla-extract/css';

import { DIVIDER_MARGIN } from '../divider/divider.css';

import { vars } from '@/style/theme.css';

export const tabList = style({
  display: 'flex',
  position: 'relative',
  width: 'fit-content',
});

export const tabItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  cursor: 'pointer',
  position: 'relative',
});

export const tabInput = style({
  position: 'absolute',
  opacity: 0,
  width: 0,
  height: 0,
});

export const tabLabel = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  cursor: 'pointer',
  padding: '0.5rem 1rem',
  color: vars.color.text.tertiary,
  transition: 'color 0.2s ease-in-out',
  zIndex: 2,
  userSelect: 'none',
});

globalStyle(`${tabInput}:checked + ${tabLabel}`, {
  color: vars.color.text.primary,
});

globalStyle(`${tabInput}:checked + ${tabLabel}:before`, {
  content: '""',
  position: 'absolute',
  bottom: `calc(-${DIVIDER_MARGIN} - 1px)`,
  left: 0,
  width: '100%',
  height: '1px',
  backgroundColor: vars.color.text.primary,
  pointerEvents: 'none',
});

export const activeMarker = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  height: '100%',
  zIndex: 1,
  backgroundColor: 'transparent',
  borderRadius: '0.5rem',

  '@media': {
    '(hover: hover)': {
      backgroundColor: vars.color.bg.secondary,
    },
  },
});

export const ACTIVE_MARKER_ANIMATION_DELAY = 0.1;

export const activeMarkerAnimation = style({
  transition: `all ${ACTIVE_MARKER_ANIMATION_DELAY}s ease-in-out`,
});

const activeMarkerFadeoutKF = keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
});

export const activeMarkerFadeout = style({
  animationName: activeMarkerFadeoutKF,
  animationDuration: `${ACTIVE_MARKER_ANIMATION_DELAY}s`,
  animationFillMode: 'forwards',
  animationTimingFunction: 'ease-in-out',
});
