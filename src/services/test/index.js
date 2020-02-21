const isert = require("./isert");

module.exports = (models, config) => {
  return {
    isert: isert(models, config)
  };
};
