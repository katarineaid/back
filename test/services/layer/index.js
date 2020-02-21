const testRead = require("./read.test");

function testServicesLayer(assert, models) {
  return {
    testRead: testRead(assert, models)
  };
}

module.exports = testServicesLayer;
