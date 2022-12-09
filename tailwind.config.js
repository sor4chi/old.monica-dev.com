const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './page/**/*.{js,ts,jsx,tsx}',
    './ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    sizes: {
      timelineBarAreaWidth: '1.5rem',
      timelineBarWidth: '0.125rem',
      timelinePoint: '0.75rem',
      timelineCardGap: '2rem',
    },
    lineHeights: {
      timelineLabel: '2rem',
    },
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
