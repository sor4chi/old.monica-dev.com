import '../styles/globals.css';
import colors from 'tailwindcss/colors';
import Image from 'next/image';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    values: [
      {
        name: 'light',
        value: colors.slate[100],
      },
      {
        name: 'dark',
        value: colors.neutral[900],
      },
    ],
  },
  darkMode: {
    current: 'light',
  },
};

export const globalTypes = {
  darkMode: true,
};

Image.propTypes = {
  unoptimized: null,
};

Image.defaultProps = {
  unoptimized: true,
};
