module.exports = {
  extends: ['../../.eslintrc.js'],
  overrides: [
    {
      files: ['*.css.ts'],
      rules: {
        'sort/object-properties': ['off'],
      },
    },
  ],
};
