describe("JaridM Tests", () => {
  it("Visits Page", () => {
    cy.visit("/");
  });
  it("Changes Viewport", () => {
    cy.viewport("iphone-5");
    cy.wait(200);
  });
  //test button click
  it("clicks Home on hamburger menu", () => {
    cy.contains("Home").click({ force: true });
    cy.url().should("include", "/home");
  });
  it("clicks Login on hamburger menu", () => {
    cy.contains("Login").click({ force: true });
    cy.url().should("include", "/login");
  });
  it("clicks Profile on hamburger menu", () => {
    cy.contains("Profile").click({ force: true });
    cy.url().should("include", "/profile");
  });
  it("clicks trips on hamburger menu", () => {
    cy.contains("Trips").click({ force: true });
    cy.url().should("include", "/trips");
  });
  // end button click
});
