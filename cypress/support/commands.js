// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("loginOrangeHRM", (username, password) => {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    cy.get("[name= 'username']").clear().type(username);
    cy.get("[name= 'password']").clear().type(password);
    cy.get("[type = 'submit']").click();
})

Cypress.Commands.add("logoutOrangeHRM", () => {
    cy.get(".oxd-userdropdown-tab").click();
    cy.contains(".oxd-userdropdown-link", "Logout").click();
    cy.url().should("include", "/auth/login");
});

Cypress.Commands.add("verifyLoginPage", () => {
    cy.url().should("include", "/auth/login");
    cy.get("[name= 'username']").should("be.visible");
    cy.get("[name= 'password']").should("be.visible");
    cy.get("[type= 'submit']").should("be.visible");
});

Cypress.Commands.add("verifyDashboardPage", () => {
    cy.url().should("include", "/dashboard/index");
    cy.get(".oxd-topbar-header-breadcrumb").should("be.visible");
});

