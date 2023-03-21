import { style, styleVariants } from '@vanilla-extract/css';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  width: '100%',
});

export const meta = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  width: '100%',
});

export const contentHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginBottom: '0.5rem',
});

export const previewSetting = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
});

export const contentEditor = style({
  display: 'flex',
});

export const contentTextArea = style({
  height: '50rem',
  resize: 'none',
  width: '100%',
});

export const PREVIEW_EDITOR_HEIGHT = '90vh';

const basePreview = style({
  height: PREVIEW_EDITOR_HEIGHT,
  overflowX: 'hidden',
  overflowY: 'auto',
  transition: 'all 0.2s ease-in-out, opacity 0.2s ease-in-out',
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
