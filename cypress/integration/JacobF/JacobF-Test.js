describe("JacobF Tests", () => {
  const fakeEmail = "JacobF@cypress.com";
  const fakePassword = "testing";
  it("Visits landing  page", () => {
    cy.viewport("iphone-6+");
    cy.visit("/");
    cy.contains("Login");
  });
  it("viewport-iphone-6+", () => {
    // cy.get(".header-wrapper").should("be.visible");

    cy.viewport("iphone-6+");

    cy.get(".burger").should("be.visible");
    cy
      .get(".burger")
      .should("be.visible")
      .click();
    cy
      .get(".hamburger-links-container")
      .should("be.visible")
      .get(".hamburger-links");

    cy.viewport("iphone-6+");
    cy.wait(200);
    //test button click

    cy
      .get(".burger")
      .should("be.visible")
      .click();
    cy.contains("Login").click({ force: true });
    cy.url().should("include", "/login");
    cy
      .get(".burger")
      .should("be.visible")
      .click();
  });
  it("Logs in", () => {
    cy.viewport("iphone-6+");
    cy.wait(200);
    cy
      .get(".burger")
      .should("be.visible")
      .click();
    cy
      .get("[data-cypress-email-input]")
      .type(fakeEmail)
      .should("have.value", fakeEmail)
      .get("[data-cypress-password-input]")
      .type(fakePassword)
      .should("have.value", fakePassword);
    //   .get("[data-cypress-submit-login]")
    //   .click();
    cy.log("created new user");
  });
  it("clicks Profile link", () => {
    cy.viewport("iphone-6+");
    cy.wait(200);
    cy
      .get(".burger")
      .should("be.visible")
      .click();
    cy.contains("Profile").click({ force: true });
    cy.url().should("include", "/profile");
    cy
      .get(".burger")
      .should("be.visible")
      .click();
  });
  it("clicks trips link", () => {
    cy.viewport("iphone-6+");
    cy.wait(200);
    cy
      .get(".burger")
      .should("be.visible")
      .click();
    cy.contains("Trips").click({ force: true });
    cy.url().should("include", "/trips");
    cy
      .get(".burger")
      .should("be.visible")
      .click();
    //   end button click
  });
});
