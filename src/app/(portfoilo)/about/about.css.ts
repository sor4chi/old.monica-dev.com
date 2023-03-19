import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const hero = style({
  display: 'flex',
  margin: '2rem auto',
  gap: '2rem',
  alignItems: 'center',
  justifyContent: 'center',

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      gap: '1rem',
    },
  },
});

export const title = style({
  color: vars.color.text.primary,
  fontSize: '2rem',
  fontWeight: 300,
  marginTop: 0,
  marginBottom: '1rem',
  textAlign: 'center',
});

export const socialListContainer = style({
  fontSize: '1rem',

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      fontSize: '0.8rem',
    },
  },
});

export const icon = style({
  borderRadius: '50%',

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      width: '5rem',
      height: '5rem',
    },
  },
});

export const skills = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  justifyContent: 'center',
  marginTop: '1rem',
  marginBottom: '3rem',
});

export const skill = style({});

globalStyle(`${skill} > *`, {
  margin: '0 0.25rem',
  verticalAlign: 'middle',
});
