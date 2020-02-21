const testCreate = require("./read.test");

function testControllersLayer(chai, server, assert) {
  return {
    testCreate: testCreate(chai, server, assert)
  };
}

module.exports = testControllersLayer;
