import js from '@eslint/js';
import airbnbBase from 'eslint-config-airbnb-base';
import importPlugin from 'eslint-plugin-import';
import nodePlugin from 'eslint-plugin-n';
import security from 'eslint-plugin-security';
import jest from 'eslint-plugin-jest';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
import unusedImports from 'eslint-plugin-unused-imports';
import promise from 'eslint-plugin-promise';
import sonarjs from 'eslint-plugin-sonarjs';

export default [
  {
    ...js.configs.recommended,
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    ignores: ['*.json', 'Dockerfile', '*.conf', '*.yml', 'dist', 'node_modules', 'coverage'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
      promise,
      sonarjs,
      n: nodePlugin,
      security,
      jest,
      prettier: prettierPlugin,
    },
    rules: {
      ...airbnbBase.rules,
      'no-console': 'warn',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-const': 'error',
      'no-undef': 'error',
      eqeqeq: ['error', 'always'],
      'no-multi-spaces': ['error'],
      'brace-style': ['error', '1tbs'],
      curly: ['error', 'all'],
      'prefer-destructuring': ['error', { object: true, array: false }],
      indent: ['error', 2],
      semi: ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      'no-inline-comments': 'error',

      // Imports
      'import/extensions': ['error', 'always', { js: 'always' }],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
      'n/no-missing-import': ['error', { tryExtensions: ['.js', '.json'] }],

      // SonarJS
      'sonarjs/no-duplicate-string': 'warn',
      'sonarjs/cognitive-complexity': ['warn', 15],

      // Promises
      'promise/always-return': 'warn',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/catch-or-return': 'warn',
      'promise/no-nesting': 'warn',

      // Unused imports
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // ✅ Prettier rule
      'prettier/prettier': 'error',
      quotes: ['error', 'single', { avoidEscape: true }],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js'],
        },
      },
    },
  },
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
];
