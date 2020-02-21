const create = require("./create");
const read = require("./read");
const update = require("./update");
const remove = require("./remove");

module.exports = function features(layerService, controller, logger) {
  controller.post("/create/features", create(layerService, logger));
  controller.post("/read/features", read(layerService, logger));
  controller.post("/update/features", update(layerService, logger));
  controller.post("/delete/features", remove(layerService, logger));
  return controller;
};
