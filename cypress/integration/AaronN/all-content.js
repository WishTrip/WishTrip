describe("All Content", () => {
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
  it("Clicks LandingPage Link", () => {
    cy.visit("/");
    cy.contains("LandingPage").click();
    cy.url().should("include", "/");
  });
  it("clicks Login Link", () => {
    cy.visit("/");
    cy.contains("Login").click();
    cy.url().should("include", "/login");
  });
});
