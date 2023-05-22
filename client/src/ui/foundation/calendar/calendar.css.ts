import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const calendar = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
});

export const calendarHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  boxSizing: 'border-box',
});

export const calendarHeaderTitle = style({
  fontSize: '1rem',
  fontWeight: 400,
  color: vars.color.text.primary,
});

export const calendarBody = style({
  width: '100%',
});

export const calendarWeekday = style({
  fontSize: '0.75rem',
  fontWeight: 400,
  color: vars.color.text.tertiary,
});

export const calendarDate = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '0.25rem 0.5rem',
  borderRadius: '0.25rem',
  cursor: 'pointer',
  transition: 'background-color 0.1s ease-in-out',
  border: 'none',
  backgroundColor: vars.color.bg.secondary,
  color: vars.color.text.primary,

  '@media': {
    '(hover: hover)': {
      ':hover': {
        color: vars.color.text.primary,
        backgroundColor: vars.color.bg.tertiary,
      },
    },
  },
});

export const calendarDateToday = style({
  backgroundColor: vars.color.bg.primary,
});

export const calendarDateSelected = style({
  color: 'white', // fixed for contrast a11y
  backgroundColor: vars.color.accent.primary,

  '@media': {
    '(hover: hover)': {
      ':hover': {
        color: 'white', // fixed for contrast a11y
        backgroundColor: vars.color.accent.primary,
      },
    },
  },
});

export const wrapper = style({
  width: '100%',
  height: 'fit-content',
});

export const label = style({
  margin: '0 0 0.5rem',
  display: 'inline-block',
});

export const error = style({
  color: vars.color.error,
  margin: '0.5rem 0 0',
});

export const arrowIcon = style({
  width: '1rem',
  height: '1rem',
  color: vars.color.text.secondary,
});
