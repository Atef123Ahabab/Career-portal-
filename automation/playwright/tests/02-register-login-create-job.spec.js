const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { JobManagementPage } = require('../pages/JobManagementPage');

test.describe('Q2 — Register then Create Job', () => {
  test('user can register and create a job', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const jobPage = new JobManagementPage(page);

    const uniqueEmail = `user_${Date.now()}@test.com`;
    const uniqueTitle = `AutoTest Job ${Date.now()}`;

    // Listen to all network responses from the job API
    page.on('response', async (res) => {
      if (res.url().includes('/api/jobs')) {
        console.log('API:', res.url(), '→', res.status());
      }
    });
    page.on('console', (msg) => console.log('BROWSER:', msg.text()));

    await loginPage.goto();
    await loginPage.register('Playwright User', uniqueEmail, 'password123');
    await dashboard.waitForDashboard();
    await dashboard.jobsTab.click();
    await jobPage.waitForForm();

    await jobPage.createJob({
      title: uniqueTitle,
      description: 'Created by Playwright',
      skills: 'React, Node.js',
      qualifications: 'BS CS',
      location: 'Remote',
    });

    // Give the API time to respond
    await page.waitForTimeout(5000);

    // Dump the full page HTML text so we can see what's rendered
    const bodyText = await page.locator('body').innerText();
    console.log('=== PAGE CONTENT ===');
    console.log(bodyText.substring(0, 2000));
    console.log('=== END ===');

    const notices = await page.locator('.notice').allTextContents();
    const errors = await page.locator('.error').allTextContents();
    console.log('ALL NOTICES:', JSON.stringify(notices));
    console.log('ALL ERRORS:', JSON.stringify(errors));

    await page.screenshot({ path: 'screenshots/q2-job-created.png', fullPage: true });
  });
});
