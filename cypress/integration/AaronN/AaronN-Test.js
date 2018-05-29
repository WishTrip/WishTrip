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
  // it("Clicks Plan Link", () => {
  //   cy.visit("/");
  //   cy.contains("Plan").click();
  //   cy.url().should("include", "/plan");
  // });
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
  //test for viewport functionality
  context("Viewport", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("cy.viewport() - set the viewport size and dimension", () => {
      cy.get(".header-wrapper").should("be.visible");

      cy.viewport(320, 480);

      // the navbar should have collapse since our screen is smaller
      cy.get(".burger").should("be.visible");
      cy
        .get(".burger")
        .should("be.visible")
        .click();
      cy
        .get(".hamburger-links-container")
        .should("be.visible")
        .get(".hamburger-links");

      // lets see what our app looks like on a super large screen
      cy.viewport(2999, 2999);

      // We added a cy.wait() between each viewport change so you can see
      // the change otherwise it's a little too fast to see :)

      cy.viewport("macbook-15");
      cy.wait(200);

      //test button click
      cy.contains("Home").click();
      cy.url().should("include", "/home");
      cy.contains("Login").click();
      cy.url().should("include", "/login");
      cy.contains("Profile").click();
      cy.url().should("include", "/profile");
      cy.contains("Trips").click();
      cy.url().should("include", "/trips");
      // end button click
    });
    it("cy.viewport() - set the viewport size and dimension", () => {
      cy.get(".header-wrapper").should("be.visible");

      cy.viewport(320, 480);

      // the navbar should have collapse since our screen is smaller
      cy.get(".burger").should("be.visible");
      cy
        .get(".burger")
        .should("be.visible")
        .click();
      cy
        .get(".hamburger-links-container")
        .should("be.visible")
        .get(".hamburger-links");

      // lets see what our app looks like on a super large screen
      cy.viewport(2999, 2999);

      // We added a cy.wait() between each viewport change so you can see
      // the change otherwise it's a little too fast to see :)
      cy.viewport("macbook-13");
      cy.wait(200);
      //test button click
      cy.contains("Home").click();
      cy.url().should("include", "/home");
      cy.contains("Login").click();
      cy.url().should("include", "/login");
      cy.contains("Profile").click();
      cy.url().should("include", "/profile");
      cy.contains("Trips").click();
      cy.url().should("include", "/trips");
      // end button click
    });
    it("cy.viewport() - set the viewport size and dimension", () => {
      cy.get(".header-wrapper").should("be.visible");

      cy.viewport(320, 480);

      // the navbar should have collapse since our screen is smaller
      cy.get(".burger").should("be.visible");
      cy
        .get(".burger")
        .should("be.visible")
        .click();
      cy
        .get(".hamburger-links-container")
        .should("be.visible")
        .get(".hamburger-links");

      // lets see what our app looks like on a super large screen
      cy.viewport(2999, 2999);

      // We added a cy.wait() between each viewport change so you can see
      // the change otherwise it's a little too fast to see :)
      cy.viewport("macbook-11");
      cy.wait(200);
      //test button click
      cy.contains("Home").click();
      cy.url().should("include", "/home");
      cy.contains("Login").click();
      cy.url().should("include", "/login");
      cy.contains("Profile").click();
      cy.url().should("include", "/profile");
      cy.contains("Trips").click();
      cy.url().should("include", "/trips");
      // end button click
    });
    it("cy.viewport() - set the viewport size and dimension", () => {
      cy.get(".header-wrapper").should("be.visible");

      cy.viewport(320, 480);

      // the navbar should have collapse since our screen is smaller
      cy.get(".burger").should("be.visible");
      cy
        .get(".burger")
        .should("be.visible")
        .click();
      cy
        .get(".hamburger-links-container")
        .should("be.visible")
        .get(".hamburger-links");

      // lets see what our app looks like on a super large screen
      cy.viewport(2999, 2999);

      // We added a cy.wait() between each viewport change so you can see
      // the change otherwise it's a little too fast to see :)
      cy.viewport("ipad-2");
      cy.wait(200);
      //test button click
      cy.contains("Home").click();
      cy.url().should("include", "/home");
      cy.contains("Login").click();
      cy.url().should("include", "/login");
      cy.contains("Profile").click();
      cy.url().should("include", "/profile");
      cy.contains("Trips").click();
      cy.url().should("include", "/trips");
      // end button click
    });
    it("cy.viewport() - set the viewport size and dimension", () => {
      cy.get(".header-wrapper").should("be.visible");

      cy.viewport(320, 480);

      // the navbar should have collapse since our screen is smaller
      cy.get(".burger").should("be.visible");
      cy
        .get(".burger")
        .should("be.visible")
        .click();
      cy
        .get(".hamburger-links-container")
        .should("be.visible")
        .get(".hamburger-links");

      // lets see what our app looks like on a super large screen
      cy.viewport(2999, 2999);

      // We added a cy.wait() between each viewport change so you can see
      // the change otherwise it's a little too fast to see :)
      cy.viewport("ipad-mini");
      cy.wait(200);
      //test button click
      cy.contains("Home").click();
      cy.url().should("include", "/home");
      cy.contains("Login").click();
      cy.url().should("include", "/login");
      cy.contains("Profile").click();
      cy.url().should("include", "/profile");
      cy.contains("Trips").click();
      cy.url().should("include", "/trips");
      // end button click
    });
    it("cy.viewport() - set the viewport size and dimension", () => {
      cy.get(".header-wrapper").should("be.visible");

      cy.viewport(320, 480);

      // the navbar should have collapse since our screen is smaller
      cy.get(".burger").should("be.visible");
      cy
        .get(".burger")
        .should("be.visible")
        .click();
      cy
        .get(".hamburger-links-container")
        .should("be.visible")
        .get(".hamburger-links");

      // lets see what our app looks like on a super large screen
      cy.viewport(2999, 2999);

      // We added a cy.wait() between each viewport change so you can see
      // the change otherwise it's a little too fast to see :)
      cy.viewport("iphone-6+");
      cy.wait(200);
      //test button click
      cy.contains("Home").click({ force: true });
      cy.url().should("include", "/home");
      cy.contains("Login").click({ force: true });
      cy.url().should("include", "/login");
      cy.contains("Profile").click({ force: true });
      cy.url().should("include", "/profile");
      cy.contains("Trips").click({ force: true });
      cy.url().should("include", "/trips");
      // end button click
    });
    it("cy.viewport() - set the viewport size and dimension", () => {
      cy.get(".header-wrapper").should("be.visible");

      cy.viewport(320, 480);

      // the navbar should have collapse since our screen is smaller
      cy.get(".burger").should("be.visible");
      cy
        .get(".burger")
        .should("be.visible")
        .click();
      cy
        .get(".hamburger-links-container")
        .should("be.visible")
        .get(".hamburger-links");

      // lets see what our app looks like on a super large screen
      cy.viewport(2999, 2999);

      // We added a cy.wait() between each viewport change so you can see
      // the change otherwise it's a little too fast to see :)
      cy.viewport("iphone-6");
      cy.wait(200);
      //test button click
      cy.contains("Home").click({ force: true });
      cy.url().should("include", "/home");
      cy.contains("Login").click({ force: true });
      cy.url().should("include", "/login");
      cy.contains("Profile").click({ force: true });
      cy.url().should("include", "/profile");
      cy.contains("Trips").click({ force: true });
      cy.url().should("include", "/trips");
      // end button click
    });
    it("cy.viewport() - set the viewport size and dimension", () => {
      cy.get(".header-wrapper").should("be.visible");

      cy.viewport(320, 480);

      // the navbar should have collapse since our screen is smaller
      cy.get(".burger").should("be.visible");
      cy
        .get(".burger")
        .should("be.visible")
        .click();
      cy
        .get(".hamburger-links-container")
        .should("be.visible")
        .get(".hamburger-links");

      // lets see what our app looks like on a super large screen
      cy.viewport(2999, 2999);

      // We added a cy.wait() between each viewport change so you can see
      // the change otherwise it's a little too fast to see :)
      cy.viewport("iphone-5");
      cy.wait(200);
      //test button click
      cy.contains("Home").click({ force: true });
      cy.url().should("include", "/home");
      cy.contains("Login").click({ force: true });
      cy.url().should("include", "/login");
      cy.contains("Profile").click({ force: true });
      cy.url().should("include", "/profile");
      cy.contains("Trips").click({ force: true });
      cy.url().should("include", "/trips");
      // end button click
    });
    it("cy.viewport() - set the viewport size and dimension", () => {
      cy.get(".header-wrapper").should("be.visible");

      cy.viewport(320, 480);

      // the navbar should have collapse since our screen is smaller
      cy.get(".burger").should("be.visible");
      cy
        .get(".burger")
        .should("be.visible")
        .click();
      cy
        .get(".hamburger-links-container")
        .should("be.visible")
        .get(".hamburger-links");

      // lets see what our app looks like on a super large screen
      cy.viewport(2999, 2999);

      // We added a cy.wait() between each viewport change so you can see
      // the change otherwise it's a little too fast to see :)
      cy.viewport("iphone-4");
      cy.wait(200);
      //test button click
      cy.contains("Home").click({ force: true });
      cy.url().should("include", "/home");
      cy.contains("Login").click({ force: true });
      cy.url().should("include", "/login");
      cy.contains("Profile").click({ force: true });
      cy.url().should("include", "/profile");
      cy.contains("Trips").click({ force: true });
      cy.url().should("include", "/trips");
      // end button click
    });
    it("cy.viewport() - set the viewport size and dimension", () => {
      cy.get(".header-wrapper").should("be.visible");

      cy.viewport(320, 480);

      // the navbar should have collapse since our screen is smaller
      cy.get(".burger").should("be.visible");
      cy
        .get(".burger")
        .should("be.visible")
        .click();
      cy
        .get(".hamburger-links-container")
        .should("be.visible")
        .get(".hamburger-links");

      // lets see what our app looks like on a super large screen
      cy.viewport(2999, 2999);

      // We added a cy.wait() between each viewport change so you can see
      // the change otherwise it's a little too fast to see :)
      cy.viewport("iphone-3");
      cy.wait(200);
      //test button click
      cy.contains("Home").click({ force: true });
      cy.url().should("include", "/home");
      cy.contains("Login").click({ force: true });
      cy.url().should("include", "/login");
      cy.contains("Profile").click({ force: true });
      cy.url().should("include", "/profile");
      cy.contains("Trips").click({ force: true });
      cy.url().should("include", "/trips");
      // end button click
    });
    it("cy.viewport() - set the viewport size and dimension", () => {
      cy.get(".header-wrapper").should("be.visible");

      cy.viewport(320, 480);

      // the navbar should have collapse since our screen is smaller
      cy.get(".burger").should("be.visible");
      cy
        .get(".burger")
        .should("be.visible")
        .click();
      cy
        .get(".hamburger-links-container")
        .should("be.visible")
        .get(".hamburger-links");

      // lets see what our app looks like on a super large screen
      cy.viewport(2999, 2999);

      // We added a cy.wait() between each viewport change so you can see
      // the change otherwise it's a little too fast to see :)

      cy.viewport("ipad-2", "portrait");
      cy.wait(200);
      //test button click
      cy.contains("Home").click({ force: true });
      cy.url().should("include", "/home");
      cy.contains("Login").click({ force: true });
      cy.url().should("include", "/login");
      cy.contains("Profile").click({ force: true });
      cy.url().should("include", "/profile");
      cy.contains("Trips").click({ force: true });
      cy.url().should("include", "/trips");
      // end button click
    });
    it("cy.viewport() - set the viewport size and dimension", () => {
      cy.get(".header-wrapper").should("be.visible");

      cy.viewport(320, 480);

      // the navbar should have collapse since our screen is smaller
      cy.get(".burger").should("be.visible");
      cy
        .get(".burger")
        .should("be.visible")
        .click();
      cy
        .get(".hamburger-links-container")
        .should("be.visible")
        .get(".hamburger-links");

      // lets see what our app looks like on a super large screen
      cy.viewport(2999, 2999);

      // We added a cy.wait() between each viewport change so you can see
      // the change otherwise it's a little too fast to see :)
      cy.viewport("iphone-4", "landscape");
      cy.wait(200);
      //test button click
      cy.contains("Home").click({ force: true });
      cy.url().should("include", "/home");
      cy.contains("Login").click({ force: true });
      cy.url().should("include", "/login");
      cy.contains("Profile").click({ force: true });
      cy.url().should("include", "/profile");
      cy.contains("Trips").click({ force: true });
      cy.url().should("include", "/trips");
      // end button click
      cy
        .get(".burger")
        .should("be.visible")
        .click();
    });
  });
});
