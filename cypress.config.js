const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    video: false, // 🚫 Vídeo desativado para não pesar o projeto
    specPattern: [
      'cypress/e2e/login.cy.js',
      'cypress/e2e/inventory.cy.js',
      'cypress/e2e/cart.cy.js',
      'cypress/e2e/checkout.cy.js',
      'cypress/e2e/menu.cy.js',
      'cypress/e2e/api/api.cy.js',
    ],
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
});