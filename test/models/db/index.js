const testConnectDisconnect = require("./connectDisconnect.test");
const testWriteData = require("./writeData.test");
const testReadAll = require("./readAll.test");
const testRemove = require("./remove.test");
const testUpdate = require("./update.test");
const testGetCollectionNames = require("./getCollectionNames.test");

function testModelsDB(chai, server, assert) {
  return {
    testConnectDisconnect: testConnectDisconnect(chai, server, assert),
    testWriteData: testWriteData(chai, server, assert),
    testReadAll: testReadAll(chai, server, assert),
    testRemove: testRemove(chai, server, assert),
    testUpdate: testUpdate(chai, server, assert),
    testGetCollectionNames: testGetCollectionNames(chai, server, assert)
  };
}

module.exports = testModelsDB;
