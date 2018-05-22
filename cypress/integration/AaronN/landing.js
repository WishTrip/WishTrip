describe("landing", () => {
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
  });
  it("Clicks Plan Link", () => {
    cy.visit("/");
    cy.contains("Plan").click();
  });
  it("Clicks Profile Link", () => {
    cy.visit("/");
    cy.contains("Profile").click();
  });
  it("Clicks LandingPage Link", () => {
    cy.visit("/");
    cy.contains("LandingPage").click();
  });
});
