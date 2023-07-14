import { globalStyle } from '@vanilla-extract/css';

import { colorVars } from './contract.css';
import { constants, vars } from './theme.css';

globalStyle('body', {
  backgroundColor: colorVars.gray[1],
  fontFamily:
    '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  margin: 0,
  padding: 0,
  transition: 'color .2s ease-in-out, background-color .2s ease-in-out, background .2s ease-in-out',
  color: colorVars.gray[12],

  display: 'grid',
  gridTemplateColumns: '1fr 15rem 40rem 15rem 1fr',
  gridTemplateRows: '10rem 1fr 10rem',
  gap: vars.spacing.absolute[4],
  minHeight: '100vh',
  height: '100%',

  '@media': {
    [constants.breakpoint.lg]: {
      gridTemplateColumns: '1fr 15rem 40rem 1fr',
    },
    [constants.breakpoint.md]: {
      gridTemplateColumns: '1fr 40rem 1fr',
    },
    [constants.breakpoint.sm]: {
      gridTemplateColumns: '1fr',
    },
  },
});
