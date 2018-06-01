describe("JacobA Tests", () => {
  const email = "JacobA@cypress.com";
  const password = "password1";
  const username = "Cypress001";
  const firstName = "Cy";
  const lastName = "press";

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
  it("visits profile page", () => {
    cy.visit("/");
    cy.contains("Profile").click();
  });
  it("inputs username", () => {
    cy
      .get("[data-cypress-input-username]")
      .type(username)
      .should("have.value", username);
  });
  it("inputs email", () => {
    cy
      .get("[data-cypress-input-email]")
      .type(email)
      .should("have.value", email);
  });
  it("inputs firstName", () => {
    cy
      .get("[data-cypress-input-firstname]")
      .type(firstName)
      .should("have.value", firstName);
  });
  it("inputs lastName", () => {
    cy
      .get("[data-cypress-input-lastname]")
      .type(lastName)
      .should("have.value", lastName);
  });
  it("submits form", () => {
    cy.get("[data-cypress-profile-submit]");
  });
});
