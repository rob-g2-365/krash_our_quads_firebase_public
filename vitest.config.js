// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.js', 'vitest-localstorage-mock'],
    mockReset: false,
    coverage: {
      reporter: ['json', 'json-summary', 'html'],
      reportOnFailure: true,
    }
  },
});