const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './page/**/*.{js,ts,jsx,tsx}',
    './ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {},
      typography: {
        DEFAULT: {
          css: {
            pre: {
              padding: '0',
            },
          },
        },
      },
    },
    keyframes: {
      spin: {
        '0%, 100%': { transform: 'rotate(0deg)' },
        '50%': { transform: 'rotate(180deg)' },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
};
