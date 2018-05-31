describe("Full end to end testing", () => {
  const code = "H8GB012L";
  const email = "FullTest@Cypress.com";
  const password = "FullCypressTesting";
  const tripName = "All Out Cypress Testing";
  const departureLocation = "500 S Ervay St, Dallas Texas";
  const startingLocation = "500 S Ervay St, Dallas Texas";
  const budget = 1800;
  const tripNotes = "13 week bootcamp!, DevMountain RULES!";
  it("Goes to site", () => {
    cy.visit("/");
    cy.wait(600);
  });
  it("Clicks Home Button", () => {
    cy.contains("Home").click();
    cy.url().should("include", "/home");
    cy.wait(200);
  });
  it("Cicks Login Button", () => {
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.wait(200);
  });
  it("Clicks profile", () => {
    cy.contains("Profile").click();
    cy.url().should("include", "/profile");
    cy.wait(200);
  });
  it("Clicks Trips Button", () => {
    cy.contains("Trips").click();
    cy.url().should("include", "/trips");
    cy.wait(200);
  });
  it("Clicks logo button", () => {
    cy.contains("WishTrip").click();
    cy.url().should("include", "/");
    cy.wait(200);
  });
  it("Clicks login button on bottom of landing page", () => {
    cy.get(".landingpage-login-link").click();
    cy.url().should("include", "/login");
  });
  it("Returns to Landing page", () => {
    cy.contains("WishTrip").click();
    cy.url().should("include", "/");
    cy.wait(200);
  });
  it("Clicks WishTrip button on center of app", () => {
    cy.get(".landingpage-login-link");
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.wait(200);
  });
  it("Returns to Landing page", () => {
    cy.contains("WishTrip").click();
    cy.url().should("include", "/");
    cy.wait(200);
  });
  it("enter code in code field", () => {
    cy
      .get(".landingpage-codeinput")
      .type(code)
      .should("have.value", code)
      .type("{enter}", { force: true });
    cy.wait(200);
  });
  it("Returns to Landing page", () => {
    cy.contains("WishTrip").click();
    cy.url().should("include", "/");
    cy.wait(200);
  });
  it("Goes to login page", () => {
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.wait(200);
  });
  it("enters email address", () => {
    cy
      .get("[data-cypress-email-input]")
      .type(email)
      .should("have.value", email);
  });
  it("enters password", () => {
    cy
      .get("[data-cypress-password-input]")
      .type(password)
      .should("have.value", password);
    cy.wait(400);
  });
  it("submits login", () => {
    cy
      .get("[data-cypress-submit-login]")
      .wait(200)
      .click()
      .wait(900);
  });
  it("inputs trip name", () => {
    cy
      .get("[data-cypress-input-tripname]")

      .type(tripName)
      .should("have.value", tripName);
  });
  //   it("inputs Destination", () => {
  //     cy
  //       .get("[data-cypress-departure-location]")
  //       .type(departureLocation)
  //       .should("have.value", departureLocation);
  //   });
  //   it("inputs Destination", () => {
  //     cy
  //       .get("[data-cypress-starting-location]")
  //       .type(startingLocation)
  //       .should("have.value", startingLocation);
  //   });
  //   it("inputs budget", () => {
  //     cy
  //       .get("[data-cypress-budget]")
  //       .type(budget)
  //       .should("have.value", budget);
  //   });
  //   it("inputs trip notes", () => {
  //     cy
  //       .get("[data-cypress-agenda-notes]")
  //       .type(tripNotes)
  //       .should("have.value", tripNotes);
  //   });
  //   it("clicks save", () => {
  //     cy.get("[data-cypress-agenda-submit]").click();
  //   });
});
