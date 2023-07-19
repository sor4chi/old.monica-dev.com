import { globalStyle, keyframes, style } from '@vanilla-extract/css';

import { constants } from '@/styles/theme.css';

export const styles = {
  main: style({
    padding: `10rem ${constants.size.xGutter} ${constants.size.xGutter} ${constants.size.xGutter}`,
    containerType: 'inline-size',

    '@media': {
      [`screen and (max-width: ${constants.breakpoint.sm})`]: {
        padding: constants.size.xGutter,
      },
    },
  }),
};

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

const fadeOut = keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
});

const slideIn = keyframes({
  from: {
    transform: 'translateY(1rem)',
  },
  to: {
    transform: 'translateY(0)',
  },
});

const slideOut = keyframes({
  from: {
    transform: 'translateY(0)',
  },
  to: {
    transform: 'translateY(-1rem)',
  },
});

globalStyle(`::view-transition-old(root)`, {
  animation: [
    `90ms cubic-bezier(0.4, 0, 1, 1) both ${fadeOut}`,
    `300ms cubic-bezier(0.4, 0, 0.2, 1) both ${slideOut}`,
  ].join(','),
});

globalStyle(`::view-transition-new(root)`, {
  animation: [
    `210ms cubic-bezier(0, 0, 0.2, 1) 90ms both ${fadeIn}`,
    `300ms cubic-bezier(0, 0, 0.2, 1) 90ms both ${slideIn}`,
  ].join(','),
});
