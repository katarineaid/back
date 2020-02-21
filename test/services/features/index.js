const testRead = require("./read.test");
const testUpdate = require("./update.test");
const testRemove = require("./remove.test");

function testServicesLayer(assert, models) {
  return {
    testRead: testRead(assert, models),
    testUpdate: testUpdate(assert, models),
    testRemove: testRemove(assert, models)
  };
}

module.exports = testServicesLayer;
