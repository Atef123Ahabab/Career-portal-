class DashboardPage {
  constructor(page) {
    this.page = page;
    this.logoutButton = page.getByRole('button', { name: /Logout/i });
    // These tabs render only AFTER login — use exact match on their labels
    this.jobsTab = page.getByRole('button', { name: 'Job Management', exact: true });
    this.applyTab = page.getByRole('button', { name: 'Job Applications', exact: true });
    this.notice = page.locator('.notice');
  }
  async isLoggedIn() {
    return await this.logoutButton.isVisible({ timeout: 3000 }).catch(() => false);
  }
  async waitForDashboard() {
    await this.logoutButton.waitFor({ state: 'visible', timeout: 10000 });
  }
}
module.exports = { DashboardPage };
