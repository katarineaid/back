const testRead = require("./read.test");
const testCreate = require("./read.test");
const testUpdate = require("./update.test");
const testRemove = require("./remove.test");

function testControllersFeatures(chai, server, assert) {
  return {
    testRead: testRead(chai, server, assert),
    testCreate: testCreate(chai, server, assert),
    testUpdate: testUpdate(chai, server, assert),
    testRemove: testRemove(chai, server, assert)
  };
}

module.exports = testControllersFeatures;
