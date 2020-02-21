const insert = require("./insert");

module.exports = function test(testService, controller, logger) {
  controller.post("/insert", insert(testService, logger));
  return controller;
};
