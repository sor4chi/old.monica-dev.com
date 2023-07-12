module.exports = {
  extends: ['../../.eslintrc.js', 'next/core-web-vitals'],
  overrides: [
    {
      files: ['next.config.js', 'src/env/**'],
      rules: {
        '@typescript-eslint/no-var-requires': ['off'],
      },
    },
    {
      files: ['*.css.ts'],
      rules: {
        'sort/object-properties': ['off'],
      },
    },
  ],
};
