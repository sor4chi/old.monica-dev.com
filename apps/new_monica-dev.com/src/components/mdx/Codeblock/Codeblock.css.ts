import { globalStyle, keyframes, style } from '@vanilla-extract/css';

import { focusInteraction } from '@/styles/common.css';
import { vars } from '@/styles/theme.css';

export const COPY_COOLDOWN = 750;

const outlineGlowKeyframes = keyframes({
  '0%': {
    boxShadow: `0 0 0 0 ${vars.color.blue[8]}`,
  },
  '50%': {
    boxShadow: `0 0 ${vars.spacing.relative[2]} ${vars.spacing.relative[1]} ${vars.color.blue[8]}`,
  },
  '100%': {
    boxShadow: `0 0 0 0 ${vars.color.blue[8]}`,
  },
});

export const styles = {
  div: style({
    position: 'relative',
  }),
  pre: style({
    borderRadius: vars.spacing.relative[1],
    border: `1px solid ${vars.color.gray[4]}`,
    padding: `${vars.spacing.relative[3]} 0`,
    fontSize: vars.font.size.base,
    overflow: 'auto',
    lineHeight: 1.7,
  }),
  rightTopFloatArea: style({
    position: 'absolute',
    top: vars.spacing.relative[2],
    right: vars.spacing.relative[2],
  }),
  copyButton: style([
    focusInteraction,
    {
      cursor: 'pointer',
      borderRadius: vars.spacing.relative[1],
      background: 'transparent',
      color: vars.color.gray[11],
      fontSize: vars.font.size.sm,
      border: 'none',
      width: vars.spacing.relative[10],
      height: vars.spacing.relative[10],
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0,

      transition: 'opacity 0.2s ease-in-out, box-shadow 0.2s ease-in-out',

      ':hover': {
        background: vars.color.gray[3],
      },

      ':focus-visible': {
        opacity: 1,
        background: vars.color.gray[3],
      },
    },
  ]),
  copied: style({
    animation: `${outlineGlowKeyframes} ${COPY_COOLDOWN}ms ease-in-out`,
  }),
};

globalStyle(`${styles.div}:hover ${styles.copyButton}`, {
  opacity: 1,
});

globalStyle('div[data-rehype-pretty-code-fragment]', {
  marginTop: vars.spacing.relative[8],
});

globalStyle('div[data-rehype-pretty-code-title]', {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: vars.spacing.full,
  gap: vars.spacing.relative[2],
  color: vars.color.gray[11],
  marginBottom: vars.spacing.relative[2],
});

globalStyle(".dark pre[data-theme='light'], .dark code[data-theme='light'], .dark div[data-theme='light']", {
  display: 'none',
});

globalStyle(".light pre[data-theme='dark'], .light code[data-theme='dark'], .light div[data-theme='dark']", {
  display: 'none',
});

globalStyle(`${styles.pre} > code`, {
  display: 'grid',
});

globalStyle(`${styles.pre} [data-line]`, {
  borderLeftWidth: '2px',
  borderLeftColor: 'transparent',
  borderLeftStyle: 'solid',
  paddingLeft: vars.spacing.relative[4],
  paddingRight: vars.spacing.relative[4],
});

globalStyle(`${styles.pre} [data-highlighted-line]`, {
  background: vars.color.gray[2],
  borderLeftColor: vars.color.blue[10],
});
