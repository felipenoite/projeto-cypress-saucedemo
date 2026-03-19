// cypress/e2e/checkout.cy.js

describe("Feature: Checkout", () => {
  beforeEach(() => {
    cy.login();
    cy.addToCart("Sauce Labs Backpack");
    cy.goToCart();
    cy.get("[data-test=checkout]").click();
  });

  // Scenario: Finalizar compra com sucesso
  it("Dado que preencho todos os dados, quando confirmo o pedido, então devo ver a mensagem de sucesso", () => {
    cy.fillCheckoutInfo("João", "Silva", "01310-100");

    cy.url().should("include", "/checkout-step-two");
    cy.get(".cart_item").should("have.length", 1);
    cy.get(".summary_total_label").should("be.visible");

    cy.get("[data-test=finish]").click();

    cy.get(".complete-header").should("contain", "Thank you for your order!");
    cy.get(".complete-text").should("be.visible");
  });

  // Scenario: Avançar sem preencher nenhum campo
  it("Quando clico em Continue sem preencher os dados, então devo ver 'First Name is required'", () => {
    cy.get("[data-test=continue]").click();

    cy.get("[data-test=error]").should("contain", "First Name is required");
  });

  // Scenario: Avançar sem preencher o sobrenome
  it("Quando preencho apenas o nome, então devo ver 'Last Name is required'", () => {
    cy.get("[data-test=firstName]").type("João");
    cy.get("[data-test=continue]").click();

    cy.get("[data-test=error]").should("contain", "Last Name is required");
  });

  // Scenario: Avançar sem preencher o CEP
  it("Quando preencho nome e sobrenome mas não o CEP, então devo ver 'Postal Code is required'", () => {
    cy.get("[data-test=firstName]").type("João");
    cy.get("[data-test=lastName]").type("Silva");
    cy.get("[data-test=continue]").click();

    cy.get("[data-test=error]").should("contain", "Postal Code is required");
  });

  // Scenario: Cancelar o checkout
  it("Quando clico em Cancel no checkout, então devo voltar ao carrinho", () => {
    cy.get("[data-test=cancel]").click();

    cy.url().should("include", "/cart");
    cy.get(".cart_list").should("be.visible");
  });

  // Scenario: Verificar resumo do pedido antes de finalizar
  it("Quando avanço para o step 2, então devo ver o item, subtotal, taxa e total", () => {
    cy.fillCheckoutInfo("João", "Silva", "01310-100");

    cy.get(".cart_item").should("have.length", 1);
    cy.get(".summary_subtotal_label").should("be.visible");
    cy.get(".summary_tax_label").should("be.visible");
    cy.get(".summary_total_label").should("be.visible");
  });
});
