const open = require("./open");
const close = require("./close");

module.exports = (config, library) => ({
  open: async (params) => {
    return open(config, library, params);
  },
  close: async (params) => {
    return close(config, library, params);
  }
});
