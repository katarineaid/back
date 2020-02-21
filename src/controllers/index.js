const layer = require("./layer");
const features = require("./features");
const test = require("./test");

module.exports = function upGradedRouter(services, controller, logger) {
  layer(services.layer, controller, logger);
  features(services.features, controller, logger);
  test(services.test, controller, logger);
};
