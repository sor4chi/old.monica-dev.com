import type { Preview } from '@storybook/react';
import { GlobalStyle } from '../src/util/globalStyle';
import React from 'react';
import { StoryFn } from '@storybook/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

const WithGlobalStyles = (StoryFn: StoryFn) => {
  if (typeof window !== 'undefined') {
    document.body.classList.add('dark');
  }
  return (
    <GlobalStyle>
      <StoryFn />
    </GlobalStyle>
  );
};

export const decorators = [WithGlobalStyles];
