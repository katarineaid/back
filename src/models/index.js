const db = require("./db");

class Models {
  constructor(api) {
    this.api = api;
    this.db = db(api);
    this.projection = api.projection;
  }
}

module.exports = Models;
