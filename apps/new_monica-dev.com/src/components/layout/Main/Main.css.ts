import { globalStyle, keyframes, style } from '@vanilla-extract/css';

import { constants } from '@/styles/theme.css';

const SLIDE_MOVEMENT = '1rem';
const FORWARD_TRANSITION_NAME = 'forward';
const BACKWARD_TRANSITION_NAME = 'backward';
export const FORWARD_TRANSITION_TRIGGER = `transition-${FORWARD_TRANSITION_NAME}`;
export const BACKWARD_TRANSITION_TRIGGER = `transition-${BACKWARD_TRANSITION_NAME}`;

export const styles = {
  main: style({
    padding: `10rem ${constants.size.xGutter} ${constants.size.xGutter} ${constants.size.xGutter}`,
    containerType: 'inline-size',

    '@media': {
      [`screen and (max-width: ${constants.breakpoint.sm})`]: {
        padding: constants.size.xGutter,
      },
    },
    selectors: {
      [`.${FORWARD_TRANSITION_TRIGGER} &`]: {
        viewTransitionName: FORWARD_TRANSITION_NAME,
      },
      [`.${BACKWARD_TRANSITION_TRIGGER} &`]: {
        viewTransitionName: BACKWARD_TRANSITION_NAME,
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

const slideInFromLeft = keyframes({
  from: {
    transform: `translateX(${SLIDE_MOVEMENT})`,
  },
  to: {
    transform: 'translateX(0)',
  },
});

const slideInFromRight = keyframes({
  from: {
    transform: `translateX(-${SLIDE_MOVEMENT})`,
  },
  to: {
    transform: 'translateX(0)',
  },
});

const slideOutToLeft = keyframes({
  from: {
    transform: 'translateX(0)',
  },
  to: {
    transform: `translateX(-${SLIDE_MOVEMENT})`,
  },
});

const slideOutToRight = keyframes({
  from: {
    transform: 'translateX(0)',
  },
  to: {
    transform: `translateX(${SLIDE_MOVEMENT})`,
  },
});

globalStyle(`::view-transition-old(${FORWARD_TRANSITION_NAME})`, {
  animation: [
    `90ms cubic-bezier(0.4, 0, 1, 1) both ${fadeOut}`,
    `300ms cubic-bezier(0.4, 0, 0.2, 1) both ${slideOutToLeft}`,
  ].join(','),
});

globalStyle(`::view-transition-new(${FORWARD_TRANSITION_NAME})`, {
  animation: [
    `210ms cubic-bezier(0, 0, 0.2, 1) 90ms both ${fadeIn}`,
    `300ms cubic-bezier(0, 0, 0.2, 1) 90ms both ${slideInFromLeft}`,
  ].join(','),
});

globalStyle(`::view-transition-old(${BACKWARD_TRANSITION_NAME})`, {
  animation: [
    `90ms cubic-bezier(0.4, 0, 1, 1) both ${fadeOut}`,
    `300ms cubic-bezier(0.4, 0, 0.2, 1) both ${slideOutToRight}`,
  ].join(','),
});

globalStyle(`::view-transition-new(${BACKWARD_TRANSITION_NAME})`, {
  animation: [
    `210ms cubic-bezier(0, 0, 0.2, 1) 90ms both ${fadeIn}`,
    `300ms cubic-bezier(0, 0, 0.2, 1) 90ms both ${slideInFromRight}`,
  ].join(','),
});
