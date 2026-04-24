import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // Environment — default jsdom for React tests
    environment: 'jsdom',
    globals: true,

    // Use node environment for server tests (no DOM needed)
    environmentMatchGlobs: [
      ['tests/unit/**', 'node'],
      ['tests/integration/**', 'node'],
      ['tests/server/**', 'node'],
    ],

    // Setup files
    setupFiles: ['./tests/setup.js'],

    // Test patterns
    include: [
      'tests/**/*.test.{js,jsx,ts,tsx}',
      'src/**/*.test.{js,jsx,ts,tsx}',
    ],
    exclude: ['node_modules', 'dist'],

    // Coverage
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html'],
      include: ['src/**/*.{js,jsx}', 'server/**/*.js'],
      exclude: [
        'node_modules',
        'dist',
        'tests',
        'server/test_*.js',
        'test*.js',
      ],
    },

    // Timeouts
    testTimeout: 15000,
    hookTimeout: 15000,
  },
});
