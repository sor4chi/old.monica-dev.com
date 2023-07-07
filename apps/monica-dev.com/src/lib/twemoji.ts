import twemoji from 'twemoji';

export const parseTwemoji = (text: string) => {
  return twemoji.parse(text, {
    attributes: () => ({
      style: 'height: 1em; width: 1em; vertical-align: -0.1em; margin: 0 0.25em;',
    }),
    ext: '.svg',
    folder: 'svg',
  });
};
