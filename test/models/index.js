const testModelsDB = require("./db");

function testModels(chai, server, assert) {
  return {
    testModelsDB: testModelsDB(chai, server, assert)
  };
}

module.exports = testModels;
