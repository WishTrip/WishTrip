describe("Full end to end testing", () => {
  const code = "H8GB012L";
  const email = "FullTest@Cypress.com";
  const password = "FullCypressTesting";
  const tripName = "All Out Cypress Testing";
  const departureLocation = "500 S Ervay St, Dallas Texas";
  const startingLocation = "500 S Ervay St, Dallas Texas";
  const budget = "1800";
  const budget2 = "2200";
  const tripNotes = "13 week bootcamp!, DevMountain RULES!";
  const agendaName1 = "Cypress MeetUp";
  const agendaDestination = "DevMountain Lounge";
  const agendaActivity = "Final Presentation";
  const agendaNotes = "Time to roll out the red carpet ";
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
  it("inputs departure location", () => {
    cy
      .get("[data-cypress-departure-location]")
      .type(departureLocation)
      .should("have.value", departureLocation)
      .wait(200)
      .type("{enter}", { force: true });
    cy.wait(900);
  });
  it("inputs starting location", () => {
    cy
      .get("[data-cypress-starting-location]")
      .type(startingLocation)
      .should("have.value", startingLocation)
      .wait(200)
      .type("{enter}", { force: true });
  });
  it("picks start date", () => {
    cy
      .get("[data-cypress-startdate]")
      .wait(500)
      .click()
      .get("button")
      .contains("17")
      .click();
    cy.wait(600);
  });
  it("picks end date", () => {
    cy
      .get("[data-cypress-enddate]")
      .wait(500)
      .click()
      .get("button")
      .contains("21")
      .click();
    cy.wait(600);
  });
  it("inputs budget", () => {
    cy
      .get("[data-cypress-budget]")
      .type(budget)
      .should("have.value", budget);
  });
  it("inputs trip notes", () => {
    cy
      .get("[data-cypress-notes]")
      .type(tripNotes)
      .should("have.value", tripNotes);
  });
  it("clicks plan", () => {
    cy.get("[data-cypress-submit]").click();
  });
  it("fill out agenda 1", () => {
    cy
      .get("[data-cypress-agendaname]")
      .type(agendaName1)
      .should("have.value", agendaName1);
  });
  it("inputs agenda destination", () => {
    cy
      .get("[data-cypress-agendadestination]")
      .type(agendaDestination)
      .should("have.value", agendaDestination);
  });
  it("inputs agenda activity", () => {
    cy
      .get("[data-cypress-agendaactivity]")
      .type(agendaActivity)
      .should("have.value", agendaActivity);
  });
  it("inputs budget field", () => {
    cy
      .get("[data-cypress-agendabudget]")
      .clear()
      .type(budget)
      .should("have.value", budget);
  });
  it(" inputs agenda notes", () => {
    cy
      .get("[data-cypress-agendanotes]")
      .type(agendaNotes)
      .should("have.value", agendaNotes);
  });
  it("sets agenda time", () => {
    cy
      .get("[data-cypress-timeinput]")
      .wait(500)
      .click()
      .get("button")
      .contains("submit")
      .click();
    cy.wait(600);
  });
  it("submits agenda 1", () => {
    cy
      .get("[data-cypress-addagenda]")
      .click()
      .wait(400);
  });
  it("adds new agenda", () => {
    cy.get("[data-cypress-newagenda]").click({ multiple: true });
  });
  it("fill out agenda 2", () => {
    cy
      .get("[data-cypress-agendaname]")
      .type(agendaName1)
      .should("have.value", agendaName1);
  });
  it("inputs agenda destination", () => {
    cy
      .get("[data-cypress-agendadestination]")
      .type(agendaDestination)
      .should("have.value", agendaDestination);
  });
  it("inputs agenda activity", () => {
    cy
      .get("[data-cypress-agendaactivity]")
      .type(agendaActivity)
      .should("have.value", agendaActivity);
  });
  it("inputs budget field", () => {
    cy
      .get("[data-cypress-agendabudget]")
      .type("{backspace}", { force: true })
      .should("have.value", "")
      .type(budget2)
      .should("have.value", budget2);
  });
  it(" inputs agenda notes", () => {
    cy
      .get("[data-cypress-agendanotes]")
      .type(agendaNotes)
      .should("have.value", agendaNotes);
  });
  it("sets agenda time", () => {
    cy
      .get("[data-cypress-timeinput]")
      .wait(500)
      .click()
      .get("button")
      .contains("submit")
      .click();
    cy.wait(600);
  });
  it("submits agenda 1", () => {
    cy
      .get("[data-cypress-addagenda]")
      .click()
      .wait(400);
  });
  it("adds new agenda", () => {
    cy.get("[data-cypress-newagenda]").click({ multiple: true });
  });
  it("fill out agenda 3", () => {
    cy
      .get("[data-cypress-agendaname]")
      .type(agendaName1)
      .should("have.value", agendaName1);
  });
  it("inputs agenda destination", () => {
    cy
      .get("[data-cypress-agendadestination]")
      .type(agendaDestination)
      .should("have.value", agendaDestination);
  });
  it("inputs agenda activity", () => {
    cy
      .get("[data-cypress-agendaactivity]")
      .type(agendaActivity)
      .should("have.value", agendaActivity);
  });
  it("inputs budget field", () => {
    cy
      .get("[data-cypress-agendabudget]")
      .type("{backspace}", { force: true })
      .should("have.value", "")
      .type(budget2)
      .should("have.value", budget2);
  });
  it(" inputs agenda notes", () => {
    cy
      .get("[data-cypress-agendanotes]")
      .type(agendaNotes)
      .should("have.value", agendaNotes);
  });
  it("sets agenda time", () => {
    cy
      .get("[data-cypress-timeinput]")
      .wait(500)
      .click()
      .get("button")
      .contains("submit")
      .click();
    cy.wait(600);
  });
});
