/* eslint-env node */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['react-refresh'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-refresh/only-export-components': ['error', { allowConstantExport: true }],
  },
  ignorePatterns: [
    'dist',
    'node_modules',
    'android',
    'ios',
    'coverage',
    '*.md',
  ],
  overrides: [
    {
      files: ['vite.config.js', 'postcss.config.js', 'tailwind.config.js', 'scripts/**/*.mjs'],
      env: { node: true },
    },
  ],
};
