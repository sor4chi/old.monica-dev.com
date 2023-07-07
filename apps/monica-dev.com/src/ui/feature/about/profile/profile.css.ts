import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const skills = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  marginTop: '1rem',
  marginBottom: '3rem',
  color: vars.color.text.secondary,
});

export const skill = style({
  color: vars.color.text.primary,
  ':before': {
    content: '"#"',
    color: vars.color.accent.primary,
    marginRight: '0.25rem',
  },
});

globalStyle(`${skill} > *`, {
  margin: '0 0.25rem',
  verticalAlign: 'middle',
});
