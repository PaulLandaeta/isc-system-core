module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    //Reglas de estilo
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
    'no-trailing-spaces': 'error',
    'max-len': ['error', { 'code': 80 }],

    //Regla de detección de errores
    'no-duplicate-imports': 'error',
    'no-unused-vars': 'warn',
    'no-undef': 'error',
    'no-console': 'warn',
    'eqeqeq': ['error', 'always'],
    'no-empty-function': 'warn',
    'no-debugger': 'error',
    'consistent-return': 'warn',
  },
};
