import { style, styleVariants } from '@vanilla-extract/css';

import { focusInteraction } from '@/styles/common.css';
import { vars } from '@/styles/theme.css';

export const styles = {
  button: style([
    focusInteraction,
    {
      backgroundColor:'transparent',
      color: vars.color.gray[12],
      border: 'none',
      borderRadius: vars.spacing.relative[1],
      cursor: 'pointer',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: vars.font.size.base,

      ':hover': {
        background: vars.color.gray[3],
      },
    },
  ]),
  buttonVariant: styleVariants({
    text: {
      padding: `${vars.spacing.relative[2]} ${vars.spacing.relative[4]}`,
    },
    icon: {
      padding: vars.spacing.relative[2],
    },
  }),
};
