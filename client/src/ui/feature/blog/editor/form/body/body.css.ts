import { assignVars, createThemeContract, style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
});

export const metaArea = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem',
});

export const contentEditorVars = createThemeContract({
  bodyHeight: null,
});

export const contentEditor = style({
  vars: assignVars(contentEditorVars, {
    bodyHeight: '60vh',
  }),
});

const CONTENT_EDITOR_HEADER_HEIGHT = '1.5rem';
const CONTENT_EDITOR_HEADER_MARGIN_BOTTOM = '0.5rem';
const CONTENT_FULL_SCREEN_PADDING = '2rem';

export const contentFullScreen = style({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1,
  width: '100vw',
  height: '100vh',
  background: vars.color.bg.primary,
  padding: CONTENT_FULL_SCREEN_PADDING,
  boxSizing: 'border-box',
  vars: assignVars(contentEditorVars, {
    bodyHeight: `calc(100dvh - ${CONTENT_EDITOR_HEADER_HEIGHT} - ${CONTENT_EDITOR_HEADER_MARGIN_BOTTOM} - ${CONTENT_FULL_SCREEN_PADDING} * 2) !important`,
  }),
});

export const contentHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  height: CONTENT_EDITOR_HEADER_HEIGHT,
  marginBottom: CONTENT_EDITOR_HEADER_MARGIN_BOTTOM,
});

export const previewLabel = style({
  color: vars.color.text.secondary,
});

export const contentEditorBody = style({
  display: 'flex',
});

export const contentEditorOptions = style({
  display: 'flex',
  gap: '1rem',
});

const basePreview = style({
  height: contentEditorVars.bodyHeight,
  overflowX: 'hidden',
  overflowY: 'auto',
  transition: 'width 0.2s ease-in-out, opacity 0.2s ease-in-out, margin-left 0.2s ease-in-out',
});

export const preview = styleVariants({
  show: [
    basePreview,
    {
      opacity: 1,
      width: '100%',
      marginLeft: '1rem',
    },
  ],
  hide: [
    basePreview,
    {
      opacity: 0,
      width: 0,
      marginLeft: 0,
    },
  ],
});
