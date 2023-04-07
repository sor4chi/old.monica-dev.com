module.exports = {
  extends: ['next/core-web-vitals', 'plugin:import/recommended', 'plugin:sort/recommended', 'plugin:redos/recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'plugin:storybook/recommended'],
  overrides: [{
    files: ['next.config.js', 'src/env/**'],
    rules: {
      '@typescript-eslint/no-var-requires': ['off']
    }
  }, {
    files: ['*.css.ts'],
    rules: {
      'sort/object-properties': ['off']
    }
  }],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  plugins: ['import', 'unused-imports', 'sort', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/consistent-type-imports': ['error'],
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    'import/namespace': ['off'],
    'import/newline-after-import': ['error'],
    'import/no-unresolved': 'off',
    'import/order': ['error', {
      alphabetize: {
        order: 'asc'
      },
      'newlines-between': 'always'
    }],
    'sort/imports': ['off'],
    'unused-imports/no-unused-imports': 'warn'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.cts', '.mts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json'
      }
    },
    react: {
      version: 'detect'
    }
  }
};