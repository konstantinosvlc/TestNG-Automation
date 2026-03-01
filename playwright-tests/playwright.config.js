require('dotenv').config();

const config = {
  testDir: './tests',
  testMatch: '**/*.spec.js',
  timeout: parseInt(process.env.TIMEOUT) || 30000,
  expect: {
    timeout: parseInt(process.env.TIMEOUT) || 30000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/test-results.json' }],
    ['list'],
  ],
  use: {
    actionTimeout: 0,
    navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT) || 30000,
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...require('@playwright/test').devices['Desktop Chrome'] },
    },
    // Uncomment to test on other browsers
    // {
    //   name: 'firefox',
    //   use: { ...require('@playwright/test').devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...require('@playwright/test').devices['Desktop Safari'] },
    // },
  ],
  webServer: process.env.WEB_SERVER ? {
    command: process.env.WEB_SERVER,
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  } : undefined,
};

module.exports = config;
