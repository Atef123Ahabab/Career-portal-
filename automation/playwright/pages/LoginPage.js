class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.registerTab = page.getByRole('button', { name: 'Register' });
    this.fullNameInput = page.locator('input[name="fullName"]');
    this.errorBox = page.locator('.error');
  }
  async goto() { await this.page.goto('/'); }
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
  async register(fullName, email, password) {
    await this.registerTab.click();
    await this.fullNameInput.fill(fullName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
module.exports = { LoginPage };
