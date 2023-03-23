import { assignVars, createThemeContract, keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

const containerPadding = '1rem';
const containerGap = {
  pc: '3rem',
  mobile: '1rem',
};

export const container = style({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
  height: '100%',
  gap: containerGap.pc,
  padding: containerPadding,
  boxSizing: 'border-box',

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      flexDirection: 'column',
      gap: containerGap.mobile,
    },
  },
});

export const themeSwitchContainer = style({
  position: 'absolute',
  right: '1rem',
  top: '1rem',
});

const navItemCount = 3;
const navItemHeight = '2rem';
const navItemVerticalPadding = '0.5rem';
const navItemGap = '1rem';
const navHeight = `calc(${navItemHeight} * ${navItemCount} + ${navItemVerticalPadding} * ${navItemCount} * 2 + ${navItemGap} * ${
  navItemCount - 1
})`;
const dividerThickness = '1px';

const fullProfileHeight = `calc(100svh - ${containerPadding} * 2)`;
const withNavProfileHeight = `calc(100svh - ${containerPadding} * 2 - ${navHeight} - ${containerGap.mobile} * 2 - ${dividerThickness})`;

const shrinkAnimation = keyframes({
  '0%': { height: fullProfileHeight },
  '80%': { height: fullProfileHeight },
  '100%': { height: withNavProfileHeight },
});

export const profile = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      height: withNavProfileHeight,
      justifyContent: 'center',
      animationDuration: '2s',
      animationIterationCount: 1,
      animationName: shrinkAnimation,
      animationTimingFunction: 'ease-in-out',
    },
  },
});

export const icon = style({
  borderRadius: '50%',
  boxShadow: `0 0 1rem 0 ${vars.color.bg.secondary}`,

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      width: '10rem',
      height: '10rem',
    },
  },
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

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      scale: 0.8,
    },
  },
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

const titleVars = createThemeContract({
  lineHeight: null,
  fontSize: null,
});

export const title = style({
  vars: assignVars(titleVars, {
    lineHeight: '3.5rem',
    fontSize: '3rem',
  }),
  alignItems: 'center',
  color: vars.color.text.primary,
  display: 'inline-flex',
  fontSize: titleVars.fontSize,
  fontWeight: 700,
  lineHeight: titleVars.lineHeight,
  margin: 0,
  marginTop: '2rem',
  overflow: 'hidden',
  textAlign: 'center',

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      vars: assignVars(titleVars, {
        lineHeight: '2.5rem',
        fontSize: '2rem',
      }),
    },
  },
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
  [steps[2]]: {
    transform: `translateY(calc(-1 * ${titleVars.lineHeight}))`,
  },
  [steps[3]]: {
    transform: `translateY(calc(-1 * ${titleVars.lineHeight}))`,
  },
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
  height: titleVars.lineHeight,
  margin: '0 1rem',
});

export const subtitle = style({
  color: vars.color.text.tertiary,
  fontSize: '1.5rem',
  fontWeight: 400,
  lineHeight: '2rem',
  margin: '1rem 0 0.5rem 0',
  textAlign: 'center',
});

export const divider = style({
  margin: 0,
  width: dividerThickness,
  height: '20rem',
  border: 'none',
  background: vars.color.bg.secondary,

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      width: '80%',
      height: dividerThickness,
    },
  },
});

export const navList = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const navListItem = style({
  lineHeight: navItemHeight,

  selectors: {
    '& + &': {
      marginTop: navItemGap,
    },
  },
});

export const navLink = style({
  padding: `${navItemVerticalPadding} 1rem`,
  width: '100%',
  display: 'block',
  boxSizing: 'border-box',
  color: vars.color.text.secondary,
  textDecoration: 'none',
  fontSize: '1.5rem',
  borderRadius: '0.25rem',
  transition: 'background .5s ease-out',
  position: 'relative',

  ':before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: vars.color.text.primary,
    width: '0%',
    transition: 'width .2s ease-out',
  },

  '@media': {
    '(hover: hover)': {
      selectors: {
        '&:hover:before': {
          width: '100%',
          transition: 'width .2s ease-out',
        },
      },
    },
  },
});
