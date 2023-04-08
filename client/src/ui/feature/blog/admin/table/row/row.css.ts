import { keyframes, style } from '@vanilla-extract/css';

export const skeletonAnimation = keyframes({
  '0%': {
    backgroundPosition: '100% 50%',
  },
  '100%': {
    backgroundPosition: '0% 50%',
  },
});

const light = '#ffffff';
const dark = '#c8cad0';

export const skeletonStyle = style({
  background: `linear-gradient(90deg, ${dark} 30%, ${light} 50%, ${dark} 70%)`,
  backgroundSize: '400% 400%',
  animation: `${skeletonAnimation} 2s ease-in-out infinite`,
  userSelect: 'none',
  height: '1.5rem',
  borderRadius: '0.25rem',
});
