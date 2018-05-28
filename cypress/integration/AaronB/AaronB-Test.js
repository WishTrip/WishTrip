describe("AaronB Tests", () => {
  const tripName = "Cypress Trip";
  const tripDestination = "Cypress Hills";
  const tripNotes = "Bring water and snacks";
  const budget = "1000";
  const tripActivity = "IHOP";
  it("Does Not Do Much", () => {
    expect(true).to.equal(true);
  });
  it("Clicks Home Link, fills day form and submits", () => {
    cy.visit("/");
    cy.contains("Home").click();
    cy.url().should("include", "/home");
  });
  it("inputs tripName", () => {
    cy
      .get("[data-cypress-agenda-name]")
      .type(tripName)
      .should("have.value", tripName);
  });
  it("inputs Destination", () => {
    cy
      .get("[data-cypress-agenda-destination]")
      .type(tripDestination)
      .should("have.value", tripDestination);
  });
  it("inputs Destination", () => {
    cy
      .get("[data-cypress-agenda-activity]")
      .type(tripActivity)
      .should("have.value", tripActivity);
  });
  it("inputs budget", () => {
    cy
      .get("[data-cypress-budget]")
      .type(budget)
      .should("have.value", budget);
  });
  it("inputs trip notes", () => {
    cy
      .get("[data-cypress-agenda-notes]")
      .type(tripNotes)
      .should("have.value", tripNotes);
  });
  it("clicks save", () => {
    cy.get("[data-cypress-agenda-submit]").click();
  });
});
