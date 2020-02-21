const testControllersLayer = require("./features");
const testControllersFeatures = require("./features");

function testControllers(chai, server, assert) {
  return {
    testControllersLayer: testControllersLayer(chai, server, assert),
    testControllersFeatures: testControllersFeatures(chai, server, assert)
  };
}

module.exports = testControllers;
