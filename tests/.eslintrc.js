module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-cc'
  ],
  rules: {
      'cc/no-global-cc': 'error'
  }
}
