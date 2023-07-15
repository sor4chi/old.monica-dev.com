import { style } from '@vanilla-extract/css';

import { vars } from './theme.css';

export const focusInteraction = style({
  transition: 'box-shadow 0.2s ease-in-out',

  ':focus-visible': {
    outline: 'none',
    boxShadow: `0 0 0 2px ${vars.color.blue[8]}`,
  },
});
