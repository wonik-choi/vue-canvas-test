/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: ['eslint:recommended', '@vue/eslint-config-typescript', 'plugin:vue/vue3-essential'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'vue/multi-word-component-names': 'off',
  },
};
