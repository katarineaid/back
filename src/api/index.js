const library = require("./library");
const db = require("./db");
const projection = require("./projection");

module.exports = (config, logger) => {
  return {
    config,
    library: library(config),
    logger,
    db: db(config, library(config), logger),
    projection: projection(config, library(config))
  };
};
