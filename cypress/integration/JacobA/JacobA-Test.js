describe("JacobA Tests", () => {
  const email = "JacobA@cypress.com";
  const password = "password1";

  it("Visits landing  page", () => {
    cy.visit("/");
  });
  it("logs in", () => {
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy
      .get("[data-cypress-email-input]")
      .type(email)
      .should("have.value", email)
      .get("[data-cypress-password-input]")
      .type(password)
      .should("have.value", password)
      .get("[data-cypress-submit-login]")
      .click();
  });
});
