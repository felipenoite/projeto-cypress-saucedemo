// cypress/e2e/login.cy.js

describe("Feature: Login", () => {
  beforeEach(() => {
    cy.visit("/")
      
})

  // Scenario: Login com credenciais válidas
  it("Dado que estou na página de login, quando informo credenciais válidas, então devo ser redirecionado ao inventário", () => {
    cy.get("[data-test=username]").type("standard_user");
    cy.get("[data-test=password]").type("secret_sauce");
    cy.get("[data-test=login-button]").click();

    cy.url().should("include", "/inventory");
    cy.get(".inventory_list").should("be.visible");
  });

  // Scenario: Login com senha incorreta
  it("Dado que informo senha incorreta, então devo ver mensagem de erro", () => {
    cy.get("[data-test=username]").type("standard_user");
    cy.get("[data-test=password]").type("wrong_password");
    cy.get("[data-test=login-button]").click();

    cy.get("[data-test=error]").should("contain", "Username and password do not match");
  });

  // Scenario: Login com usuário bloqueado
  it("Dado que informo um usuário bloqueado, então devo ver mensagem de bloqueio", () => {
    cy.get("[data-test=username]").type("locked_out_user");
    cy.get("[data-test=password]").type("secret_sauce");
    cy.get("[data-test=login-button]").click();

    cy.get("[data-test=error]").should("contain", "Sorry, this user has been locked out");
  });

  // Scenario: Login com campos vazios
  it("Dado que clico em login sem preencher os campos, então devo ver mensagem de campo obrigatório", () => {
    cy.get("[data-test=login-button]").click();

    cy.get("[data-test=error]").should("contain", "Username is required");
  });

  // Scenario: Login com usuário sem senha
  it("Dado que preencho apenas o usuário, então devo ver mensagem de senha obrigatória", () => {
    cy.get("[data-test=username]").type("standard_user");
    cy.get("[data-test=login-button]").click();

    cy.get("[data-test=error]").should("contain", "Password is required");
  });

  // Scenario: Login com performance_glitch_user
  it("Dado que faço login com performance_glitch_user, então devo ser redirecionado ao inventário (com delay)", () => {
    cy.get("[data-test=username]").type("performance_glitch_user");
    cy.get("[data-test=password]").type("secret_sauce");
    cy.get("[data-test=login-button]").click();

    cy.url({ timeout: 15000 }).should("include", "/inventory");
  });

});