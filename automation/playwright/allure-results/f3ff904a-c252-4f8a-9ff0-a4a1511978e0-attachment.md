# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 01-invalid-login.spec.js >> Q1 — Invalid Login >> should reject invalid credentials
- Location: tests/01-invalid-login.spec.js:5:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - paragraph [ref=e6]: Enterprise Hiring Suite
      - heading "Resume & Job Portal Control Center" [level=1] [ref=e7]
      - paragraph [ref=e8]: Login or create an account to continue.
  - generic [ref=e9]: Invalid credentials
  - article [ref=e11]:
    - generic [ref=e12]:
      - button "Login" [ref=e13] [cursor=pointer]
      - button "Register" [ref=e14] [cursor=pointer]
    - generic [ref=e15]:
      - textbox "Email" [ref=e16]: wrong@example.com
      - textbox "Password" [ref=e17]: wrongpassword123
      - button "Login" [active] [ref=e18] [cursor=pointer]
    - paragraph [ref=e19]: Admin login uses ADMIN_EMAIL / ADMIN_PASSWORD from .env.
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const { LoginPage } = require('../pages/LoginPage');
  3  | const { DashboardPage } = require('../pages/DashboardPage');
  4  | test.describe('Q1 — Invalid Login', () => {
  5  |   test('should reject invalid credentials', async ({ page }) => {
  6  |     const loginPage = new LoginPage(page);
  7  |     const dashboard = new DashboardPage(page);
  8  |     await loginPage.goto();
  9  |     await loginPage.login('wrong@example.com', 'wrongpassword123');
  10 |     await expect(loginPage.errorBox).toBeVisible({ timeout: 5000 });
> 11 |     expect(await dashboard.isLoggedIn()).toBe(false);
     |                                          ^ Error: expect(received).toBe(expected) // Object.is equality
  12 |     await page.screenshot({ path: 'screenshots/q1-invalid-login.png', fullPage: true });
  13 |   });
  14 | });
  15 | 
```