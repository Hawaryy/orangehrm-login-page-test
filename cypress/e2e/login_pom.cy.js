
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";

const loginPage     = new LoginPage();
const dashboardPage = new DashboardPage();

describe("Modul Login OrangeHRM | POM dan Intercept", () => {
  let credentials;

  before(() => {
    cy.fixture("credentials").then((data) => {
      credentials = data;
    });
  });

  beforeEach(() => {
    loginPage.visit();
  });

  describe("Positive Test Cases", () => {

    it("TC-LOGIN-01 | Login berhasil dengan kredensial valid", () => {
      loginPage.interceptLocations();

      loginPage.fillUsername(credentials.validUser.username);
      loginPage.fillPassword(credentials.validUser.password);
      loginPage.clickSubmit();

      cy.wait("@locations").then((intercept) => {
        expect(intercept.response.statusCode).to.equal(200);
      });

      dashboardPage.verifyOnDashboard();
    });

    it("TC-LOGIN-02 | Login berhasil, logout, kemudian login kembali", () => {
      loginPage.interceptActionSummary();

      loginPage.login(
        credentials.validUser.username,
        credentials.validUser.password
      );

      cy.wait("@actionSummary").then((intercept) => {
        expect(intercept.response.statusCode).to.equal(200);
        expect(intercept.request.method).to.equal("GET");
      });

      dashboardPage.verifyOnDashboard();
      dashboardPage.logout();
      dashboardPage.verifyLoggedOut();

      loginPage.login(
        credentials.validUser.username,
        credentials.validUser.password
      );

      dashboardPage.verifyOnDashboard();
    });

    it("TC-LOGIN-03 | Halaman login menampilkan semua elemen UI sesuai spesifikasi", () => {
      cy.intercept(
        "GET",
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
      ).as("loginPageLoad");

      loginPage.visit();

      cy.wait("@loginPageLoad").then((intercept) => {
        expect(intercept.response.statusCode).to.equal(200);
      });

      loginPage.verifyUIElements();
    });

    it("TC-LOGIN-04 | Klik 'Forgot your password?' redirect ke halaman Reset Password", () => {
      loginPage.interceptPasswordReset();

      loginPage.clickForgotPassword();

      cy.wait("@passwordReset").then((intercept) => {
        expect(intercept.response.statusCode).to.equal(200);
      });

      dashboardPage.verifyResetPasswordPage();
    });

  });


  describe("Negative Test Cases", () => {

    it("TC-LOGIN-05 | Login gagal dengan username salah dan password benar", () => {
      let actionSummaryCalled = false;
      cy.intercept(
        { method: "GET", url: "**/employees/action-summary" },
        (req) => {
          actionSummaryCalled = true;
          req.continue();
        }
      ).as("actionSummarySpy");

      loginPage.fillUsername(credentials.wrongUsernameUser.username);
      loginPage.fillPassword(credentials.validUser.password);
      loginPage.clickSubmit();

      loginPage.verifyInvalidCredentialsError();
      loginPage.verifyStillOnLoginPage();

      cy.then(() => {
        expect(
          actionSummaryCalled,
          "action-summary seharusnya tidak dipanggil saat login gagal"
        ).to.be.false;
      });
    });

    it("TC-LOGIN-06 | Login gagal dengan username benar dan password salah", () => {
      let buzzFeedCalled = false;
      cy.intercept(
        { method: "GET", url: "**/api/v2/buzz/feed" },
        (req) => {
          buzzFeedCalled = true;
          req.continue();
        }
      ).as("buzzFeedSpy");

      loginPage.fillUsername(credentials.validUser.username);
      loginPage.fillPassword(credentials.wrongPasswordUser.password);
      loginPage.clickSubmit();

      loginPage.verifyInvalidCredentialsError();
      loginPage.verifyStillOnLoginPage();

      cy.then(() => {
        expect(
          buzzFeedCalled,
          "buzz/feed seharusnya tidak dipanggil saat login gagal"
        ).to.be.false;
      });
    });

    it("TC-LOGIN-07 | Login gagal dengan username salah dan password salah", () => {
      let timeAtWorkCalled = false;
      cy.intercept(
        { method: "GET", url: "**/employees/time-at-work**" },
        (req) => {
          timeAtWorkCalled = true;
          req.continue();
        }
      ).as("timeAtWorkSpy");

      loginPage.fillUsername(credentials.wrongUsernameUser.username);
      loginPage.fillPassword(credentials.wrongPasswordUser.password);
      loginPage.clickSubmit();

      loginPage.verifyInvalidCredentialsError();
      loginPage.verifyStillOnLoginPage();

      cy.then(() => {
        expect(
          timeAtWorkCalled,
          "time-at-work seharusnya tidak dipanggil saat login gagal"
        ).to.be.false;
      });
    });

    it("TC-LOGIN-08 | Login gagal dengan username kosong dan password benar", () => {
      let leavesCalled = false;
      cy.intercept(
        { method: "GET", url: "**/employees/leaves**" },
        (req) => {
          leavesCalled = true;
          req.continue();
        }
      ).as("leavesSpy");

      loginPage.clearUsername();
      loginPage.fillPassword(credentials.validUser.password);
      loginPage.clickSubmit();

      loginPage.verifyRequiredError();
      loginPage.verifyStillOnLoginPage();

      cy.then(() => {
        expect(
          leavesCalled,
          "leaves seharusnya tidak dipanggil saat form tidak valid"
        ).to.be.false;
      });
    });

    it("TC-LOGIN-09 | Login gagal dengan username benar dan password kosong", () => {
      let eventsPushCalled = false;
      cy.intercept(
        { method: "POST", url: "**/events/push" },
        (req) => {
          eventsPushCalled = true;
          req.continue();
        }
      ).as("eventsPushSpy");

      loginPage.fillUsername(credentials.validUser.username);
      loginPage.clearPassword();
      loginPage.clickSubmit();

      loginPage.verifyRequiredError();
      loginPage.verifyStillOnLoginPage();

      cy.then(() => {
        expect(
          eventsPushCalled,
          "events/push seharusnya tidak dipanggil saat form tidak valid"
        ).to.be.false;
      });
    });

  });
});