// cypress/e2e/api/api.cy.js

/**
 * Testes de API - SauceDemo
 *
 * O SauceDemo é uma React SPA (Single Page Application).
 * Isso significa que:
 * - O HTML retornado pelo servidor é um shell vazio (sem data-test no body)
 * - Rotas como /inventory.html não existem no servidor (são gerenciadas pelo React Router)
 * - Não há endpoint REST de login — a autenticação acontece via JavaScript no browser
 *
 * Por isso, os testes de API focam em:
 * - Validar disponibilidade e status HTTP da aplicação
 * - Validar headers de resposta e performance
 * - Validar assets estáticos (JS, CSS)
 * - Simular comportamento de rotas inexistentes
 */

describe("API - SauceDemo", () => {

  // ─────────────────────────────────────────────
  // Disponibilidade da aplicação
  // ─────────────────────────────────────────────

  describe("Disponibilidade da aplicação", () => {

    it("GET / - deve retornar status 200", () => {
      cy.request({
        method: "GET",
        url: "/",
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it("GET / - deve retornar content-type text/html", () => {
      cy.request({
        method: "GET",
        url: "/",
      }).then((response) => {
        expect(response.headers["content-type"]).to.include("text/html");
      });
    });

    it("GET / - o HTML deve conter a div raiz da SPA (#root)", () => {
      cy.request({
        method: "GET",
        url: "/",
      }).then((response) => {
        // SPA React: o conteúdo é injetado via JS no #root
        expect(response.body).to.include('id="root"');
      });
    });

    it("GET / - o HTML deve referenciar o bundle JavaScript principal", () => {
      cy.request({
        method: "GET",
        url: "/",
      }).then((response) => {
        expect(response.body).to.include("/static/js/");
      });
    });

    it("GET / - o HTML deve referenciar o CSS principal", () => {
      cy.request({
        method: "GET",
        url: "/",
      }).then((response) => {
        expect(response.body).to.include("/static/css/");
      });
    });

  });

  // ─────────────────────────────────────────────
  // Assets estáticos
  // ─────────────────────────────────────────────

  describe("Assets estáticos", () => {

    it("GET /favicon.ico - deve retornar status 200", () => {
      cy.request({
        method: "GET",
        url: "/favicon.ico",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it("GET /manifest.json - deve retornar status 200 e content-type JSON", () => {
      cy.request({
        method: "GET",
        url: "/manifest.json",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers["content-type"]).to.include("application/json");
      });
    });

  });

  // ─────────────────────────────────────────────
  // Rotas inexistentes
  // ─────────────────────────────────────────────

  describe("Rotas inválidas", () => {

    it("GET /pagina-que-nao-existe - deve retornar 404", () => {
      cy.request({
        method: "GET",
        url: "/pagina-que-nao-existe",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });

    it("GET /inventory.html - deve retornar 404 (rota gerenciada pelo React Router, não pelo servidor)", () => {
      cy.request({
        method: "GET",
        url: "/inventory.html",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });

  });

  // ─────────────────────────────────────────────
  // Métodos HTTP não permitidos
  // ─────────────────────────────────────────────

  describe("Métodos HTTP não permitidos", () => {

    it("POST / - deve retornar 405 (método não permitido)", () => {
      cy.request({
        method: "POST",
        url: "/",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(405);
      });
    });

    it("DELETE / - deve retornar 405 (método não permitido)", () => {
      cy.request({
        method: "DELETE",
        url: "/",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(405);
      });
    });

  });

  // ─────────────────────────────────────────────
  // Performance
  // ─────────────────────────────────────────────

  describe("Performance", () => {

    it("GET / - deve responder em menos de 3000ms", () => {
      const start = Date.now();
      cy.request({
        method: "GET",
        url: "/",
      }).then(() => {
        const duration = Date.now() - start;
        expect(duration).to.be.lessThan(3000);
      });
    });

    it("GET /manifest.json - deve responder em menos de 3000ms", () => {
      const start = Date.now();
      cy.request({
        method: "GET",
        url: "/manifest.json",
        failOnStatusCode: false,
      }).then(() => {
        const duration = Date.now() - start;
        expect(duration).to.be.lessThan(3000);
      });
    });

  });

});