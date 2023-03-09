import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const title = style({
  fontSize: '2rem',
  fontWeight: 'bold',
  margin: 0,
  marginBottom: '1rem',
  padding: '1rem 0',
  color: vars.color.text.primary,
  borderBottom: `1px solid ${vars.color.accent.primary}`,
});

export const detail = style({
  display: 'flex',
  gap: '2rem',
});

export const sidebar = style({
  width: '15rem',

  '@media': {
    'screen and (max-width: 768px)': {
      display: 'none',
    },
  },
});
