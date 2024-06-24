const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1920,
    // baseUrl can be overidden by CLI or .env files to work with other servers
    baseUrl: "https://app.companycam.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
