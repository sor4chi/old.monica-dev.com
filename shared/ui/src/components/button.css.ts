import { style } from '@vanilla-extract/css';

import { colorVars } from '../styles/contract.css';

export const styles = {
  button: style({
    backgroundColor: colorVars.gray[1],
    color: colorVars.gray[12],
    border: 'none',
    borderRadius: '0.25rem',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: colorVars.gray[2],
    },
    ':focus': {
      outline: 'none',
      boxShadow: `0 0 0 0.2rem ${colorVars.gray[4]}`,
    },
  }),
};
