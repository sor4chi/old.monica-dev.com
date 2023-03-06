import { vars } from '@/style/theme.css';
import { keyframes, style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const themeSwitchContainer = style({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
});

export const icon = style({
  borderRadius: '50%',
  boxShadow: `0 0 1rem 0 ${vars.color.bg.secondary}`,
});

const titleLineHeight = '3.5rem';
const titleFontSize = '3rem';

export const title = style({
  fontSize: titleFontSize,
  lineHeight: titleLineHeight,
  fontWeight: 700,
  textAlign: 'center',
  color: vars.color.text.primary,
  display: 'inline-flex',
  alignItems: 'center',
  overflow: 'hidden',
  margin: 0,
  marginTop: '2rem',
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
  display: 'inline-flex',
  flexDirection: 'column',
  height: titleLineHeight,
  marginRight: '1rem',

  animationName: toggleAnimation,
  animationDelay: `${stopTime / 2}s`,
  animationDuration: `${total}s`,
  animationIterationCount: 'infinite',
  animationTimingFunction: 'ease-in-out',
});

export const subtitle = style({
  fontSize: '1.5rem',
  lineHeight: '2rem',
  fontWeight: 400,
  textAlign: 'center',
  color: vars.color.text.secondary,
  margin: 0,
  marginTop: '1rem',
});

export const social = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  padding: 0,
  margin: 0,
  marginTop: '1rem',
});

export const socialItem = style({
  listStyle: 'none',
});

export const socialLink = style({
  color: vars.color.text.secondary,

  ':hover': {
    opacity: 0.8,
  },
});
