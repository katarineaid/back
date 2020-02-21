const connect = require("./connect");
const disconnect = require("./disconnect");
const writeData = require("./writeData");
const readAll = require("./readAll");
const update = require("./update");
const remove = require("./remove");
const getCollectionNames = require("./getCollectionNames");
const query = require("./query");
const createIndex = require("./createIndex");

module.exports = api => {
  return {
    connect: params => connect(params, api),
    disconnect: params => disconnect(params, api),
    writeData: params => writeData(params, api),
    readAll: params => readAll(params, api),
    update: params => update(params, api),
    remove: params => remove(params, api),
    getCollectionNames: params => getCollectionNames(params, api),
    query: params => query(params, api),
    createIndex: params => createIndex(params, api)
  };
};
