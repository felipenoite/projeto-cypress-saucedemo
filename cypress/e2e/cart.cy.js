// cypress/e2e/cart.cy.js

describe("Feature: Carrinho de Compras", () => {
  beforeEach(() => {
    cy.login();
  });

  // Scenario: Adicionar produto ao carrinho
  it("Quando adiciono um produto ao carrinho, então o badge deve exibir '1' e o botão deve mudar para Remove", () => {
    cy.addToCart("Sauce Labs Backpack");

    cy.get(".shopping_cart_badge").should("have.text", "1");
    cy.contains(".inventory_item", "Sauce Labs Backpack")
      .find("button")
      .should("have.text", "Remove");
  });

  // Scenario: Adicionar múltiplos produtos
  it("Quando adiciono dois produtos, então o badge deve exibir '2'", () => {
    cy.addToCart("Sauce Labs Backpack");
    cy.addToCart("Sauce Labs Bike Light");

    cy.get(".shopping_cart_badge").should("have.text", "2");
  });

  // Scenario: Remover produto pelo inventário
  it("Quando removo um produto pelo inventário, então o badge deve desaparecer e o botão voltar para Add to cart", () => {
    cy.addToCart("Sauce Labs Backpack");
    cy.contains(".inventory_item", "Sauce Labs Backpack").find("button").click();

    cy.get(".shopping_cart_badge").should("not.exist");
    cy.contains(".inventory_item", "Sauce Labs Backpack")
      .find("button")
      .should("have.text", "Add to cart");
  });

  // Scenario: Visualizar produto no carrinho
  it("Quando acesso o carrinho, então devo ver o produto adicionado com nome e preço", () => {
    cy.addToCart("Sauce Labs Backpack");
    cy.goToCart();

    cy.get(".cart_item").should("have.length", 1);
    cy.get(".inventory_item_name").should("contain", "Sauce Labs Backpack");
    cy.get(".inventory_item_price").should("be.visible");
  });

  // Scenario: Remover produto diretamente do carrinho
  it("Quando removo um produto dentro do carrinho, então o carrinho deve ficar vazio", () => {
    cy.addToCart("Sauce Labs Backpack");
    cy.goToCart();

    cy.get("[data-test=remove-sauce-labs-backpack]").click();

    cy.get(".cart_item").should("not.exist");
    cy.get(".shopping_cart_badge").should("not.exist");
  });

  // Scenario: Continuar comprando a partir do carrinho
  it("Quando clico em Continue Shopping no carrinho, então devo voltar ao inventário", () => {
    cy.goToCart();
    cy.get("[data-test=continue-shopping]").click();

    cy.url().should("include", "/inventory");
    cy.get(".inventory_list").should("be.visible");
  });
});
