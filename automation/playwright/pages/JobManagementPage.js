class JobManagementPage {
  constructor(page) {
    this.page = page;
    this.employerIdInput = page.locator('input[name="employerId"]').first();
    this.jobTitleInput = page.locator('input[name="jobTitle"]').first();
    this.locationInput = page.locator('input[name="location"]').first();
    this.descriptionInput = page.locator('textarea[name="description"]').first();
    this.skillsInput = page.locator('textarea[name="requiredSkills"]').first();
    this.qualificationsInput = page.locator('textarea[name="qualifications"]').first();
    this.createButton = page.getByRole("button", { name: /Create Job/i }).first();
  }

  async waitForForm() {
    await this.employerIdInput.waitFor({ state: "visible", timeout: 15000 });
  }

  async createJob({ employerId = "test-employer-001", title, description, skills, qualifications, location }) {
    await this.employerIdInput.fill(employerId);
    await this.jobTitleInput.fill(title);
    await this.locationInput.fill(location);
    await this.descriptionInput.fill(description);
    await this.skillsInput.fill(skills);
    await this.qualificationsInput.fill(qualifications);
    await this.createButton.click();
  }
}
module.exports = { JobManagementPage };
