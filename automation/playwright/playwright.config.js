const { defineConfig, devices } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }], ['allure-playwright', { outputFolder: 'allure-results' }], ['list']],
  use: { baseURL: 'http://localhost:5173', trace: 'on', screenshot: 'only-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
