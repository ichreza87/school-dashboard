import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: '.',
  webServer: [
    { command: 'npm run dev --workspace=backend', url: 'http://localhost:3000/api/health', timeout: 30000 },
    { command: 'npm run dev --workspace=frontend', url: 'http://localhost:5173', timeout: 30000 },
  ],
  use: { baseURL: 'http://localhost:5173' },
});
