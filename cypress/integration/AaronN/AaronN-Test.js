describe("AaronN Tests", () => {
  const inputText = "Cypress Testing";
  const fakeEmail = "aaronn@cypress.com";
  const fakePassword = "testing";
  it("Does Not Do Much", () => {
    expect(true).to.equal(true);
  });

  it("Visits landing  page", () => {
    cy.visit("/");
    cy.contains("Login");
  });
  it("Clicks Trips Link", () => {
    cy.visit("/");
    cy.contains("Trips").click();
    cy.url().should("include", "/trips");
  });
  it("Clicks Plan Link", () => {
    cy.visit("/");
    cy.contains("Plan").click();
    cy.url().should("include", "/plan");
  });
  it("Clicks Profile Link", () => {
    cy.visit("/");
    cy.contains("Profile").click();
    cy.url().should("include", "/profile");
  });
  it("Clicks Home Link", () => {
    cy.visit("/");
    cy.contains("Home").click();
    cy.url().should("include", "/");
  });
  it("Clicks Login Link , logs in to redirect", () => {
    cy.visit("/");
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy
      .get("[data-cypress-email-input]")
      .type(fakeEmail)
      .should("have.value", fakeEmail)
      .get("[data-cypress-password-input]")
      .type(fakePassword)
      .should("have.value", fakePassword)
      .get("[data-cypress-submit-login]")
      .click();
  });
});
