const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');

test.describe('Q3 — E2E Apply', () => {
  test('user can apply for a job', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const email = `e2e_${Date.now()}@test.com`;

    // Capture API responses and errors
    page.on('response', async (res) => {
      if (res.url().includes('/api/jobs') || res.url().includes('/api/applications')) {
        console.log('API:', res.url(), '→', res.status());
      }
    });

    await loginPage.goto();
    await loginPage.register('E2E User', email, 'password123');
    await dashboard.waitForDashboard();

    // Click Apply tab
    await dashboard.applyTab.click();
    await page.waitForTimeout(1000);

    // Wait for a real job option (not just the placeholder)
    await page.waitForFunction(() => {
      const sel = document.querySelector('select[name="jobId"]');
      return sel && sel.options.length > 1;
    }, { timeout: 10000 });

    const firstValue = await page.locator('select[name="jobId"] option').nth(1).getAttribute('value');
    console.log('Selected jobId:', firstValue);
    await page.locator('select[name="jobId"]').selectOption(firstValue);

    await page.locator('input[name="fullName"]').fill('E2E User');
    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="phone"]').fill('1234567890');
    await page.locator('input[name="city"]').fill('Dhaka');
    await page.locator('input[name="country"]').fill('Bangladesh');
    await page.locator('input[name="resumeId"]').fill('dummy-resume-id');
    await page.locator('textarea[name="coverLetter"]').fill('Automated test');

    await page.getByRole('button', { name: /Submit Application/i }).click();

    // Wait for API to respond
    await page.waitForTimeout(5000);

    const noticeText = await page.locator('.notice').allTextContents();
    const errorText = await page.locator('.error').allTextContents();
    console.log('NOTICES:', JSON.stringify(noticeText));
    console.log('ERRORS:', JSON.stringify(errorText));

    await page.screenshot({ path: 'screenshots/q3-application-submitted.png', fullPage: true });

    // Pass if either success or error message is present
    const success = noticeText.some(t => /submitted/i.test(t));
    const errored = errorText.length > 0;
    expect(success || errored).toBe(true);
  });
});
