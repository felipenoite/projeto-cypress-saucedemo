// cypress/e2e/inventory.cy.js

describe("Feature: Inventário de Produtos", () => {
  beforeEach(() => {
    cy.login();
    cy.reload() // 👈 garante que cada teste começa com a página "fresca" do inventário
  });

  // Scenario: Visualizar lista de produtos
  it("Dado que estou autenticado, então devo ver 6 produtos no inventário", () => {
    cy.get(".inventory_item").should("have.length", 6);
    cy.get(".inventory_item").each(($item) => {
      cy.wrap($item).find(".inventory_item_name").should("be.visible");
      cy.wrap($item).find(".inventory_item_desc").should("be.visible");
      cy.wrap($item).find(".inventory_item_price").should("be.visible");
      cy.wrap($item).find("img").should("be.visible");
    });
  });

  // Scenario: Ordenar por preço crescente
  it("Quando ordeno por preço crescente, então os produtos devem ir do menor ao maior preço", () => {
    cy.get("[data-test=product-sort-container]").select("lohi");

    cy.get(".inventory_item_price").then(($prices) => {
      const prices = [...$prices].map((el) => parseFloat(el.innerText.replace("$", "")));
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sorted);
    });
  });

  // Scenario: Ordenar por preço decrescente
  it("Quando ordeno por preço decrescente, então os produtos devem ir do maior ao menor preço", () => {
    cy.get("[data-test=product-sort-container]").select("hilo");

    cy.get(".inventory_item_price").then(($prices) => {
      const prices = [...$prices].map((el) => parseFloat(el.innerText.replace("$", "")));
      const sorted = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sorted);
    });
  });

  // Scenario: Ordenar A-Z
  it("Quando ordeno de A a Z, então os produtos devem aparecer em ordem alfabética crescente", () => {
    cy.get("[data-test=product-sort-container]").select("az");

    cy.get(".inventory_item_name").then(($names) => {
      const names = [...$names].map((el) => el.innerText);
      const sorted = [...names].sort();
      expect(names).to.deep.equal(sorted);
    });
  });

  // Scenario: Ordenar Z-A
  it("Quando ordeno de Z a A, então os produtos devem aparecer em ordem alfabética decrescente", () => {
    cy.get("[data-test=product-sort-container]").select("za");

    cy.get(".inventory_item_name").then(($names) => {
      const names = [...$names].map((el) => el.innerText);
      const sorted = [...names].sort().reverse();
      expect(names).to.deep.equal(sorted);
    });
  });

  // Scenario: Acessar detalhe de produto
  it("Quando clico no nome de um produto, então devo ver sua página de detalhes", () => {
    cy.contains(".inventory_item_name", "Sauce Labs Backpack").click();

    cy.url().should("include", "/inventory-item");
    cy.get(".inventory_details_name").should("contain", "Sauce Labs Backpack");
    cy.get(".inventory_details_desc").should("be.visible");
    cy.get(".inventory_details_price").should("be.visible");
    cy.get("[data-test=add-to-cart]").should("be.visible");
  });
});
