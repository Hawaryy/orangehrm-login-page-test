describe("Modul login OrangeHRM", () => {
  let credentials;

  before(() => {
    cy.fixture("credentials").then((data) => {
      credentials = data; 
    })
  })

  beforeEach(() => {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
  });

  //positive test case 1
  //scenario login
  it("TC-LOGIN-01 1| Login berhasil dengan kredensial yang valid", () => {
    cy.get("[name='username']")
    .should("be.visible")
    .clear()
    .type(credentials.validUser.username);

  cy.get("[name='password']")
    .should("be.visible")
    .clear()
    .type(credentials.validUser.password);

  cy.get("[type='submit']").should("be.visible").click();

  cy.url().should("include", "/dashboard/index");
  cy.get(".oxd-topbar-header-breadcrumb")
    .should("be.visible")
    .and("contain.text", "Dashboard");
  });

  /*
  positive test case 2
  scenario login berhasil kemudian logout dan login kembali
  */
  
  it("TC-LOGIN-02 | Login berhasil, kemudian logout dan  login kembali", () => {
    cy.loginOrangeHRM(
      credentials.validUser.username,
      credentials.validUser.password
    )
    cy.verifyDashboardPage();
    cy.logoutOrangeHRM();
    cy.verifyLoginPage();
    cy.loginOrangeHRM(
      credentials.validUser.username,
      credentials.validUser.password
    );
    cy.verifyDashboardPage();
    cy.get(".oxd-topbar-header-breadcrumb").should("contain", "Dashboard");
  });
  
  /*
  test case screnario ke 3 tampilan di halaman logo lengkap
  */
  
  it("TC-LOGIN-03| Halaman login menampilkan semua elemen UI sesuai spesifikasi", () => {
    cy.get(".orangehrm-login-logo img").should("be.visible").and("have.attr", "src");
    cy.get("[name= 'username']").should("be.visible");
    cy.contains("label", "Username").should("be.visible");
    cy.get("[type= 'submit']").should("be.visible").and("contain.text", "Login");
    cy.contains("Forgot your password?").should("be.visible");
    cy.get(".orangehrm-copyright-wrapper").should("be.visible").and("contain.text", "OrangeHRM");
    cy.get(".orangehrm-login-container").should("be.visible");
  });

  /*
  test scenario 4: klik link forgot your password ""
  */
  it("TC-LOGIN-04 | Klik forgot your password berhasil redirect ke halaman forgot your password",() => {
    cy.contains("Forgot your password?").should("be.visible").click();
    cy.url().should("include", "/requestPasswordResetCode");
    cy.get(".orangehrm-forgot-password-container").should("be.visible");
    cy.contains("Reset Password").should("be.visible");
  })

  /*
  test scenario 5: login gagal; username salah, password benar
  expected: login gagal, muncul pesan notifikasi, masih di halaman login
  */
  it("TC-LOGIN-05 | Login gagal dengan username salah dan password benar",() => {
    cy.get("[name= 'username']").should("be.visible").clear().type(credentials.wrongUsernameUser.username);
    cy.get("[name= 'password']").should("be.visible").clear().type(credentials.validUser.password);
    cy.get("[type= 'submit']").should("be.visible").click();
    cy.contains("Invalid credentials").should("be.visible");
    cy.url().should("include", "auth/login");
  });

  /*
  test scenario 6: login gagal; username benar, password salah
  expected: login gagal, muncul pesan notifikasi, masih di halaman login
  */
 it("TC-LOGIN-06 | Login gagal dengan username benar dan passsword salah", () => {
    cy.get("[name= 'username']").should("be.visible").clear().type(credentials.validUser.username);
    cy.get("[name= 'password']").should("be.visible").clear().type(credentials.wrongPasswordUser.password);
    cy.get("[type= 'submit']").click();
    cy.get(".oxd-alert-content-text").should("be.visible").and("contain.text", "Invalid credentials");
    cy.url().should("include", "/auth/login");
 });

  /*
  test scenario 7: login gagal; username salah, password salah
  expected: login gagal, muncul pesan notifikasi, masih di halaman login
  */
  it("TC-LOGIN-07 | Login gagal dengan username salah dan password salah", () => {
    cy.get("[name= 'username']").should("be.visible").clear().type(credentials.wrongUsernameUser.username);
    cy.get("[name= 'password']").should("be.visible").clear().type(credentials.wrongPasswordUser.password);
    cy.get("[type= 'submit']").click();
    cy.contains("Invalid credentials").should("be.visible");
    cy.url().should("include", "auth/login");
  });
  
  /*
  test scenario 8: login gagal; username kosong, password benar
  */
  it("TC-LOGIN-08 | Login gagal dengan username kosong dan password benar", () => {
    cy.get("[name= 'username']").clear()
    cy.get("[name= 'password']").should("be.visible").clear().type(credentials.validUser.password);
    cy.get("[type= 'submit']").click();
    cy.get(".oxd-input-group__message").should("be.visible").and("contain.text", "Required");
    cy.url().should("include", "auth/login")
  });
  /*
  test scenario 9: login gagal; username benar, password kosong
  */
  it("TC-LOGIN-09 | Login gagal dengan username benar dan password kosong", () => {
    cy.get("[name= 'username']").should("be.visible").clear().type(credentials.validUser.username);
    cy.get("[name= 'password']").clear();
    cy.get("[type= 'submit']").click();
    cy.get(".oxd-input-group__message").should("be.visible").and("contain.text", "Required");
    cy.url().should("include", "auth/login")
  });
}); 