describe("AaronB Tests", () => {
  const tripName = "Cypress Trip";
  const tripDestination = "Cypress Hills";
  const tripNotes = "Bring water and snacks";
  const budget = "1000";
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
      .get("[data-cypress-tripname-input]")
      .type(tripName)
      .should("have.value", tripName);
  });
  it("inputs Destination", () => {
    cy
      .get("[data-cypress-destination-input]")
      .type(tripDestination)
      .should("have.value", tripDestination);
  });
  it("inputs budget", () => {
    cy
      .get("[data-cypress-budget-input]")
      .type(budget)
      .should("have.value", budget);
  });
  it("inputs trip notes", () => {
    cy
      .get("[data-cypress-notes-input]")
      .type(tripNotes)
      .should("have.value", tripNotes);
  });
  it("clicks save", () => {
    cy.get("[data-cypress-submit-agenda]").click();
  });
});
