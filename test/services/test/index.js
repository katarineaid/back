const insert = require("./insert.test");

function testServicesTest(assert, models) {
  return {
    insert: insert(assert, models)
  };
}

module.exports = testServicesTest;
