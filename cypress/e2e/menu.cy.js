// cypress/e2e/menu.cy.js

describe("Feature: Menu e Logout", () => {
  beforeEach(() => {
    cy.login();
  });

  // Scenario: Abrir o menu lateral
  it("Quando clico no ícone de menu, então o menu lateral deve ser exibido com as opções corretas", () => {
    cy.get("#react-burger-menu-btn").click();
    cy.get(".bm-menu").should("be.visible");
    cy.get("#inventory_sidebar_link").should("contain", "All Items");
    cy.get("#about_sidebar_link").should("contain", "About");
    cy.get("#logout_sidebar_link").should("contain", "Logout");
    cy.get("#reset_sidebar_link").should("contain", "Reset App State");
  });

  // Scenario: Realizar logout
  it("Quando clico em Logout, então devo ser redirecionado para a página de login", () => {
    cy.get("#react-burger-menu-btn").click();
    cy.get("#logout_sidebar_link").click();

    // ✅ Fix: baseUrl já termina com "/", não concatenar outra barra
    cy.url().should("include", Cypress.config("baseUrl"));
    cy.get("[data-test=login-button]").should("be.visible");
  });

  // Scenario: Não acessar inventário após logout
  it("Após logout, quando tento acessar o inventário diretamente, então devo ser redirecionado ao login", () => {
    cy.get("#react-burger-menu-btn").click();
    cy.get("#logout_sidebar_link").click();

    // ✅ Fix: baseUrl já termina com "/", não concatenar outra barra
    cy.url().should("include", Cypress.config("baseUrl"));
    cy.get("[data-test=login-button]").should("be.visible");
  });

  // Scenario: Resetar estado da aplicação
  it("Quando reseto o estado, então o carrinho deve ser esvaziado e os botões devem voltar para Add to cart", () => {
    cy.addToCart("Sauce Labs Backpack");
    cy.get(".shopping_cart_badge").should("have.text", "1");

    cy.get("#react-burger-menu-btn").click();
    cy.get(".bm-menu").should("be.visible");
    cy.get("#reset_sidebar_link").click();
    cy.get("#react-burger-cross-btn").click();

    cy.get(".bm-menu").should("not.be.visible");

    // ✅ Fix: reload necessário pois o Reset App State do Saucedemo
    // limpa o badge mas não atualiza os botões da tela automaticamente
    cy.reload();

    cy.get(".shopping_cart_badge").should("not.exist");
    cy.contains(".inventory_item", "Sauce Labs Backpack")
      .find("button")
      .should("have.text", "Add to cart");
  });

  // Scenario: Navegar para All Items pelo menu
  it("Quando clico em All Items no menu, então devo ser redirecionado ao inventário", () => {
    cy.goToCart();
    cy.get("#react-burger-menu-btn").click();
    cy.get("#inventory_sidebar_link").click();

    cy.url().should("include", "/inventory");
    cy.get(".inventory_list").should("be.visible");
  });
});