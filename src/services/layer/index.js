const readAll = require("./readAll");
const create = require("./create");
const read = require("./read");
const remove = require("./remove");

module.exports = (models, config) => {
  return {
    readAll: readAll(models, config),
    create: create(models, config),
    read: read(models, config),
    remove: remove(models, config)
  };
};
