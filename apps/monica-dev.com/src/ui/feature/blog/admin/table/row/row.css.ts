import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const skeletonAnimation = keyframes({
  '0%': {
    backgroundPosition: '100% 50%',
  },
  '100%': {
    backgroundPosition: '0% 50%',
  },
});

const light = vars.color.bg.primary;
const dark = vars.color.bg.secondary;

export const skeletonStyle = style({
  background: `linear-gradient(90deg, ${dark} 30%, ${light} 50%, ${dark} 70%)`,
  backgroundSize: '400% 400%',
  animation: `${skeletonAnimation} 2s ease-in-out infinite`,
  userSelect: 'none',
  height: '1.5rem',
  borderRadius: '0.25rem',
});
