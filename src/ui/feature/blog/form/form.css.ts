import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  width: '100%',
});

export const metaArea = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem',
});

export const tagEditor = style({
  gridRow: '1 / 4',
  gridColumn: '2 / 3',
});

export const tagSettingHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
  marginBottom: '0.5rem',
});

export const tagSetting = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const tagEditorLabel = style({
  color: vars.color.text.secondary,
  marginBottom: '0.5rem',
  display: 'inline-block',
});

export const tagInputs = style({
  display: 'flex',
  gap: '1rem',
  alignItems: 'flex-end',
});

export const tagList = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  maxHeight: '5rem',
  overflowY: 'auto',
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

export const previewLabel = style({
  color: vars.color.text.secondary,
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
