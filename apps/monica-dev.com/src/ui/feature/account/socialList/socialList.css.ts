import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const socials = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  fontSize: 'inherit',
});

const baseSocial = style({
  padding: '0.5rem',
  textDecoration: 'none',
  color: vars.color.text.tertiary,
  transition: 'color 0.3s ease, transform 0.3s ease',
  fontSize: 'inherit',
});

export const socialIcon = style({
  color: 'inherit',
  cursor: 'pointer',
  verticalAlign: 'middle',
  width: '1.5em',
  height: '1.5em',
});

export const social = styleVariants({
  twitter: [
    baseSocial,
    {
      ':hover': {
        color: vars.color.social.twitter,
      },
    },
  ],
  github: [
    baseSocial,
    {
      ':hover': {
        color: vars.color.social.github,
      },
    },
  ],
});

export const socialId = style({
  verticalAlign: 'middle',
  fontWeight: 300,
  margin: '0 0.5rem',
});
