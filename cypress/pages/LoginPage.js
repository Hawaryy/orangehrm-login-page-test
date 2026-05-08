
class LoginPage {
  
  get usernameField()       { return cy.get("[name='username']"); }
  get passwordField()       { return cy.get("[name='password']"); }
  get submitButton()        { return cy.get("[type='submit']"); }
  get forgotPasswordLink()  { return cy.contains("Forgot your password?"); }
  get logoImage()           { return cy.get(".orangehrm-login-logo img"); }
  get usernameLabel()       { return cy.contains("label", "Username"); }
  get passwordLabel()       { return cy.contains("label", "Password"); }
  get copyrightFooter()     { return cy.get(".orangehrm-copyright-wrapper"); }
  get loginContainer()      { return cy.get(".orangehrm-login-container"); }
  get errorMessage()        { return cy.get(".oxd-alert-content-text"); }
  get inlineErrorMessage()  { return cy.get(".oxd-input-group__message"); }
  get invalidCredentials()  { return cy.contains("Invalid credentials"); }

  visit() {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  }

  fillUsername(username) {
    this.usernameField.should("be.visible").clear().type(username);
  }

  fillPassword(password) {
    this.passwordField.should("be.visible").clear().type(password);
  }

  clickSubmit() {
    this.submitButton.should("be.visible").click();
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickSubmit();
  }

  clickForgotPassword() {
    this.forgotPasswordLink.should("be.visible").click();
  }

  clearUsername() {
    this.usernameField.clear();
  }

  clearPassword() {
    this.passwordField.clear();
  }

  verifyUIElements() {
    this.logoImage.should("be.visible").and("have.attr", "src");
    this.usernameField.should("be.visible");
    this.usernameLabel.should("be.visible");
    this.submitButton.should("be.visible").and("contain.text", "Login");
    this.forgotPasswordLink.should("be.visible");
    this.copyrightFooter.should("be.visible").and("contain.text", "OrangeHRM");
    this.loginContainer.should("be.visible");
  }

  verifyInvalidCredentialsError() {
    this.invalidCredentials.should("be.visible");
  }

  verifyRequiredError() {
    this.inlineErrorMessage.should("be.visible").and("contain.text", "Required");
  }


  verifyStillOnLoginPage() {
    cy.url().should("include", "auth/login");
  }

  interceptLocations() {
    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/locations"
    ).as("locations");
  }

  interceptActionSummary() {
    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary"
    ).as("actionSummary");
  }


  interceptPasswordReset() {
    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode"
    ).as("passwordReset");
  }


  interceptActionSummaryWithSpy() {
    let isCalled = false;
    cy.intercept(
      { method: "GET", url: "**/employees/action-summary" },
      (req) => {
        isCalled = true;
        req.continue();
      }
    ).as("actionSummarySpy");
    return isCalled;
  }

  interceptBuzzFeedWithSpy() {
    let isCalled = false;
    cy.intercept(
      { method: "GET", url: "**/api/v2/buzz/feed" },
      (req) => {
        isCalled = true;
        req.continue();
      }
    ).as("buzzFeedSpy");
    return isCalled;
  }


  interceptTimeAtWorkWithSpy() {
    let isCalled = false;
    cy.intercept(
      { method: "GET", url: "**/employees/time-at-work**" },
      (req) => {
        isCalled = true;
        req.continue();
      }
    ).as("timeAtWorkSpy");
    return isCalled;
  }

  interceptLeavesWithSpy() {
    let isCalled = false;
    cy.intercept(
      { method: "GET", url: "**/employees/leaves**" },
      (req) => {
        isCalled = true;
        req.continue();
      }
    ).as("leavesSpy");
    return isCalled;
  }

  interceptEventsPushWithSpy() {
    let isCalled = false;
    cy.intercept(
      { method: "POST", url: "**/events/push" },
      (req) => {
        isCalled = true;
        req.continue();
      }
    ).as("eventsPushSpy");
    return isCalled;
  }
}

export default LoginPage;