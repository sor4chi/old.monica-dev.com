import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const container = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
});

export const themeSwitchContainer = style({
  position: 'absolute',
  right: '1rem',
  top: '1rem',
});

export const icon = style({
  borderRadius: '50%',
  boxShadow: `0 0 1rem 0 ${vars.color.bg.secondary}`,
});

const titleLineHeight = '3.5rem';
const titleFontSize = '3rem';

export const title = style({
  alignItems: 'center',
  color: vars.color.text.primary,
  display: 'inline-flex',
  fontSize: titleFontSize,
  fontWeight: 700,
  lineHeight: titleLineHeight,
  margin: 0,
  marginTop: '2rem',
  overflow: 'hidden',
  textAlign: 'center',
});

const stopTime = 10;
const moveTime = 1;
const total = stopTime * 2 + moveTime * 2;
const stopTimePercent = (stopTime / total) * 100;
const moveTimePercent = (moveTime / total) * 100;
const steps = [
  '0%',
  `${stopTimePercent / 2}%`,
  `${stopTimePercent / 2 + moveTimePercent}%`,
  `${stopTimePercent / 2 + moveTimePercent + stopTimePercent}%`,
  `${stopTimePercent / 2 + moveTimePercent * 2 + stopTimePercent}%`,
  '100%',
] as const;

const toggleAnimation = keyframes({
  [steps[0]]: { transform: 'translateY(0)' },
  [steps[1]]: { transform: 'translateY(0)' },
  [steps[2]]: { transform: `translateY(-${titleLineHeight})` },
  [steps[3]]: { transform: `translateY(-${titleLineHeight})` },
  [steps[4]]: { transform: 'translateY(0)' },
  [steps[5]]: { transform: 'translateY(0)' },
});

export const titleToggle = style({
  animationDelay: `${stopTime / 2}s`,
  animationDuration: `${total}s`,
  animationIterationCount: 'infinite',
  animationName: toggleAnimation,

  animationTimingFunction: 'ease-in-out',
  display: 'inline-flex',
  flexDirection: 'column',
  height: titleLineHeight,
  marginRight: '1rem',
});

export const subtitle = style({
  color: vars.color.text.secondary,
  fontSize: '1.5rem',
  fontWeight: 400,
  lineHeight: '2rem',
  margin: 0,
  marginTop: '1rem',
  textAlign: 'center',
});

export const social = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  justifyContent: 'center',
  margin: 0,
  marginTop: '1rem',
  padding: 0,
});

export const socialItem = style({
  listStyle: 'none',
});

export const socialLink = style({
  ':hover': {
    opacity: 0.8,
  },

  color: vars.color.text.secondary,
});
