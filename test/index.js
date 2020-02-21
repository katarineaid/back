const chai = require("chai");
const assert = require("chai").assert;
const chaiHttp = require("chai-http");

const should = chai.should();
chai.use(chaiHttp);

const config = require("../src/config");
const logger = require("./testLogger");
const api = require("../src/api");
const Models = require("../src/models");
const services = require("../src/services");

const models = new Models(api(config, logger));

const testAPI = require("./api");
const testModels = require("./models");
const testServices = require("./services");
const testControllers = require("./controllers");

const server = "http://localhost:8700";

module.exports = {
  // testAPI: testAPI(assert, config)
  // testModels: testModels(assert, api(config, logger)),
  testServices: testServices(assert, models, config, api(config, logger))
  // testControllers: testControllers(chai, server, assert)
};
