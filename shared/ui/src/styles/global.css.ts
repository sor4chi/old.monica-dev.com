import { globalStyle } from '@vanilla-extract/css';

import './theme.css';
import { colorVars } from './contract.css';

globalStyle('body', {
  backgroundColor: colorVars.gray[1],
  fontFamily:
    '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  margin: 0,
  padding: 0,
  transition: 'color .2s ease-in-out, background-color .2s ease-in-out, background .2s ease-in-out',
  color: colorVars.gray[12],
});
