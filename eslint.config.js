// BCH 360° Intelligence V.10 — ESLint Flat Config (v9)
// Covers src/**/*.{js,jsx} with React, hooks, and accessibility rules
import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  // Global ignores
  {
    ignores: ['dist/**', 'node_modules/**', 'data_lake/**', 'server/**', '*.config.ts'],
  },

  // Base JS rules
  js.configs.recommended,

  // React + Hooks + Accessibility
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // React recommended
      ...reactPlugin.configs.recommended.rules,

      // React Hooks
      ...reactHooks.configs.recommended.rules,

      // Accessibility
      ...jsxA11y.configs.recommended.rules,
      'jsx-a11y/click-events-have-key-events': 'warn',   // warn, not error
      'jsx-a11y/no-static-element-interactions': 'warn', // warn, not error

      // React overrides
      'react/react-in-jsx-scope': 'off',  // Not needed with React 17+ transform
      'react/prop-types': 'off',          // Project uses plain JS

      // General quality
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-debugger': 'error',
      'eqeqeq': ['warn', 'always', { null: 'ignore' }],
    },
  },
];
