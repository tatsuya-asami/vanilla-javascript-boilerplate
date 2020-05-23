module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    // フォーマットの設定はここでは行わない。全て.prettierrc.jsで行う。
    'no-unused-vars': 'warn',
  },
};
