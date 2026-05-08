class DashboardPage {

  get breadcrumb()        { return cy.get(".oxd-topbar-header-breadcrumb"); }
  get userDropdown()      { return cy.get(".oxd-userdropdown-tab"); }
  get logoutLink()        { return cy.contains(".oxd-userdropdown-link", "Logout"); }
  get forgotPasswordContainer() { return cy.get(".orangehrm-forgot-password-container"); }
  get resetPasswordTitle()      { return cy.contains("Reset Password"); }

  clickUserDropdown() {
    this.userDropdown.click();
  }

  clickLogout() {
    this.logoutLink.click();
  }

  logout() {
    this.clickUserDropdown();
    this.clickLogout();
  }

  verifyOnDashboard() {
    cy.url().should("include", "/dashboard/index");
    this.breadcrumb.should("be.visible").and("contain.text", "Dashboard");
  }

  verifyLoggedOut() {
    cy.url().should("include", "/auth/login");
  }

  verifyResetPasswordPage() {
    cy.url().should("include", "/requestPasswordResetCode");
    this.forgotPasswordContainer.should("be.visible");
    this.resetPasswordTitle.should("be.visible");
  }
}

export default DashboardPage;