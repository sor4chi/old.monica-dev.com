import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const container = style({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
  gap: '3rem',
});

export const themeSwitchContainer = style({
  position: 'absolute',
  right: '1rem',
  top: '1rem',
});

export const profile = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const icon = style({
  borderRadius: '50%',
  boxShadow: `0 0 1rem 0 ${vars.color.bg.secondary}`,
});

export const logoContainer = style({
  position: 'relative',
});

const floatAnimation = keyframes({
  '0%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-0.2rem)' },
  '100%': { transform: 'translateY(0)' },
});

const shadowScaleAnimation = keyframes({
  '0%': { transform: 'scale(1)' },
  '50%': { transform: 'scale(1.5)' },
  '100%': { transform: 'scale(1)' },
});

export const logo = style({
  animationDuration: '2s',
  animationIterationCount: 'infinite',
  animationName: floatAnimation,
  animationTimingFunction: 'ease-in-out',
  display: 'block',
});

export const shadow = style({
  background: vars.color.text.primary,
  opacity: 0.2,

  height: '0.25rem',
  width: '1rem',
  borderRadius: '100%',

  position: 'absolute',
  bottom: '0.25rem',
  left: 0,
  right: 0,
  margin: 'auto',

  filter: 'blur(0.04rem)',

  animationDuration: '2s',
  animationIterationCount: 'infinite',
  animationName: shadowScaleAnimation,
  animationTimingFunction: 'ease-in-out',
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
  margin: '0 1rem',
});

export const subtitle = style({
  color: vars.color.text.tertiary,
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
  justifyContent: 'center',
  margin: 0,
  marginTop: '1rem',
  padding: 0,
});

export const socialItem = style({
  listStyle: 'none',
});

export const socialLink = style({
  color: vars.color.text.tertiary,
  display: 'block',
  padding: '0.5rem',

  ':hover': {
    opacity: 0.8,
  },
});

export const divider = style({
  margin: 0,
  width: '1px',
  height: '20rem',
  border: 'none',
  background: vars.color.bg.secondary,
});

export const meta = style({});

export const navList = style({
  listStyle: 'none',
  padding: 0,
});

export const navListItem = style({
  selectors: {
    '& + &': {
      marginTop: '1rem',
    },
  },
});

export const navLink = style({
  padding: '0.5rem 1rem',
  width: '100%',
  display: 'block',
  boxSizing: 'border-box',
  color: vars.color.text.secondary,
  textDecoration: 'none',
  fontSize: '1.5rem',
  borderRadius: '0.25rem',
  transition: 'background .5s ease-out',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        background: `linear-gradient(${[
          '60deg',
          `rgba(${vars.color.accent.secondaryRGB}, 1) 0%`,
          `rgba(${vars.color.accent.secondaryRGB}, 0.5) 30%`,
          `rgba(${vars.color.accent.secondaryRGB}, 0) 100%`,
        ].join(',')})`,
      },
    },
  },
});
