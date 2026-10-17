# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 03-e2e-apply-for-job.spec.js >> Q3 — E2E Apply >> user can apply for a job
- Location: tests/03-e2e-apply-for-job.spec.js:5:3

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('.notice')
Expected pattern: /submitted/i
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" locator('.notice') with timeout 10000ms
  - waiting for locator('.notice')
    7 × locator resolved to <div class="notice">Welcome, E2E User!</div>
      - unexpected value "Welcome, E2E User!"

```

```yaml
- banner:
  - paragraph: Enterprise Hiring Suite
  - heading "Resume & Job Portal Control Center" [level=1]
  - paragraph: Job posting, shortlisting, resume parsing, applications, fraud controls, and security audit logs in one place.
  - strong: User
  - text: e2e_1792262506139@test.com
  - button "Logout"
  - strong: "20"
  - text: Total Jobs
  - strong: "15"
  - text: Open Jobs
  - strong: "0"
  - text: Shortlisted
- navigation "dashboard tabs":
  - button "Job Management"
  - button "Candidate Shortlisting"
  - button "Resume Upload & Parsing"
  - button "Job Applications"
  - button "My Applications"
  - button "Skill Recommendation"
  - button "Fraud & Spam"
  - button "Audit Logs"
  - button "Featured Jobs"
  - button "Premium Subscription"
  - button "Subscriptions"
- text: Missing auth token
- article:
  - heading "Apply for Job with Resume" [level=2]
  - combobox:
    - option "Select Job"
    - option "sadb" [selected]
    - option "sadb"
    - option "sadb"
    - option "sadb"
    - option "sadb"
    - option "sadb"
    - option "xsxsxs"
    - option "Frontend Self Test Job 1776881564"
    - option "Frontend Verification Job 1776881313"
    - option "sadb"
    - option "SMTP Password Validation"
    - option "Notification UX Verification Role"
    - option "QA Notification Test Role"
    - option "bsausbsuasb"
    - option "dfaf"
  - textbox "Full Name": E2E User
  - textbox "Email": e2e_1792262506139@test.com
  - textbox "Phone": "1234567890"
  - textbox "City": Dhaka
  - textbox "Country": Bangladesh
  - textbox "Resume ID": dummy-resume-id
  - textbox "Cover Letter": Automated test
  - button "Submit Application"
- article:
  - heading "Quick Resume Lookup for Applicant" [level=2]
  - button "Load Applicant Resumes"
  - paragraph: Load applicant resumes to auto-fill resume ID.
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const { LoginPage } = require('../pages/LoginPage');
  3  | const { DashboardPage } = require('../pages/DashboardPage');
  4  | test.describe('Q3 — E2E Apply', () => {
  5  |   test('user can apply for a job', async ({ page }) => {
  6  |     const loginPage = new LoginPage(page);
  7  |     const dashboard = new DashboardPage(page);
  8  |     const email = `e2e_${Date.now()}@test.com`;
  9  |     await loginPage.goto();
  10 |     await loginPage.register('E2E User', email, 'password123');
  11 |     await expect(dashboard.heading).toBeVisible({ timeout: 10000 });
  12 |     await dashboard.applyTab.click();
  13 |     await page.waitForSelector('select[name="jobId"]');
  14 |     await page.locator('select[name="jobId"]').selectOption({ index: 1 });
  15 |     await page.locator('input[name="fullName"]').fill('E2E User');
  16 |     await page.locator('input[name="email"]').fill(email);
  17 |     await page.locator('input[name="phone"]').fill('1234567890');
  18 |     await page.locator('input[name="city"]').fill('Dhaka');
  19 |     await page.locator('input[name="country"]').fill('Bangladesh');
  20 |     await page.locator('input[name="resumeId"]').fill('dummy-resume-id');
  21 |     await page.locator('textarea[name="coverLetter"]').fill('Automated test');
  22 |     await page.getByRole('button', { name: /Submit Application/i }).click();
> 23 |     await expect(page.locator('.notice')).toContainText(/submitted/i, { timeout: 10000 });
     |                                           ^ Error: expect(locator).toContainText(expected) failed
  24 |     await page.screenshot({ path: 'screenshots/q3-application-submitted.png', fullPage: true });
  25 |   });
  26 | });
  27 | 
```