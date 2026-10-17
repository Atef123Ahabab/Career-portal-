const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
test.describe('Q1 — Invalid Login', () => {
  test('should reject invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login('wrong@example.com', 'wrongpassword123');
    await expect(loginPage.errorBox).toBeVisible({ timeout: 5000 });
    expect(await dashboard.isLoggedIn()).toBe(false);
    await page.screenshot({ path: 'screenshots/q1-invalid-login.png', fullPage: true });
  });
});
