const layer = require("./layer");
const features = require("./features");
const test = require("./test");

module.exports = (models, config) => {
  return {
    layer: layer(models, config),
    features: features(models, config),
    test: test(models, config)
  };
};
