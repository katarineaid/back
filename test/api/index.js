const testAPIdb = require("./db");
const testAPIProjection = require("./projection");

const library = require("../../src/api/library");

function testAPI(assert, config) {
  return {
    // testAPIdb: testAPIdb(assert, config, library(config)),
    testAPIProjection: testAPIProjection(assert, config, library(config))
  };
}

module.exports = testAPI;
