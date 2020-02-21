const readAll = require("./readAll");
const read = require("./read");
const create = require("./create");
const remove = require("./remove");

module.exports = function layer(layerService, controller, logger) {
  controller.post("/read/layers", readAll(layerService, logger));
  controller.post("/read/layer", read(layerService, logger));
  controller.post("/create/layer", create(layerService, logger));
  controller.post("/delete/layer", remove(layerService, logger));
  return controller;
};
