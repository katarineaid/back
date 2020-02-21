const testServicesLayer = require("./layer");
const testServicesFeatures = require("./features");
const testServicesTest = require("./test");

function testServices(assert, models) {
  return {
    // testServicesLayer: testServicesLayer(assert, models),
    // testServicesFeatures: testServicesFeatures(assert, models),
    testServicesTest: testServicesTest(assert, models)
  };
}

module.exports = testServices;
