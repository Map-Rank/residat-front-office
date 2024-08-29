/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  env: {
    node: true,
    jest: true // Add this line to define jest as part of the environment
  },
  overrides: [
    {
      files: ['src/**/__tests__/*.spec.js'],
      globals: {
        test: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeEach: 'readonly',
        it: 'readonly',
        jest: 'readonly' // Define jest here if using it specifically in test files
      },
      env: {
        jest: true // This makes all Jest globals known to ESLint in test files
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
};
