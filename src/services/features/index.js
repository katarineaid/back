const create = require("./create");
const read = require("./read");
const update = require("./update");
const remove = require("./remove");

module.exports = (models, config) => {
  return {
    create: create(models, config),
    read: read(models, config),
    update: update(models, config),
    remove: remove(models, config)
  };
};
