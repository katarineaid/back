const fs = require("fs");
const path = require("path");
const rp = require("request-promise");
const mongodb = require("mongodb");

const proj4 = require("proj4");
// const jsts = require("jsts");

module.exports = () => ({
  fs,
  path,
  rp,
  mongodb,
  proj4
});
