// cypress/support/commands.js

Cypress.Commands.add("login", (username = "standard_user", password = "secret_sauce") => {
  cy.visit("/")
  cy.get("[data-test=username]").type(username);
  cy.get("[data-test=password]").type(password);
  cy.get("[data-test=login-button]").click();
  cy.url().should("include", "/inventory") // 👈 garante que chegou no inventário
});

Cypress.Commands.add("addToCart", (productName) => {
  cy.contains(".inventory_item", productName)
    .find("button")
    .click();
});

Cypress.Commands.add("goToCart", () => {
  cy.get(".shopping_cart_link").click();
});

Cypress.Commands.add("fillCheckoutInfo", (firstName, lastName, zipCode) => {
  cy.get("[data-test=firstName]").type(firstName);
  cy.get("[data-test=lastName]").type(lastName);
  cy.get("[data-test=postalCode]").type(zipCode);
  cy.get("[data-test=continue]").click();
});
