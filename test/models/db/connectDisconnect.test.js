const connect = require("../../../src/models/db/connect");
const disconnect = require("../../../src/models/db/disconnect");
const instanceApi = require("../../../src/api/");
const logger = require("../../testLogger");

function test(assert, api) {
  const brokenApi = instanceApi(
    {
      url: "",
      dbName: ""
    },
    logger
  );
  describe("Проверка подключения и закрытия соединения к БД", () => {
    let client = {};
    it("Подключение к mongo", done => {
      const params = {
        client
      };
      connect(params, api)
        .then(response => {
          assert.typeOf(response, "object");
          assert.isDefined(response.data.client, "client определен");
          assert.isDefined(response.data.db, "db определен");
          client = response.data.client;
          done();
        })
        .catch(err => console.log(err));
    });
    it("Закрытие соедения с БД", done => {
      const params = {
        client
      };
      disconnect(params, api)
        .then(data => {
          assert.typeOf(data, "object");
          assert.isTrue(
            data.status,
            'В теле ответа в поле "status" значение не true'
          );
          done();
        })
        .catch(err => console.log(err));
    });

    it("Подключение к несуществующей БД", done => {
      connect({}, brokenApi)
        .then(data => {
          assert.isUndefined(data);
          done();
        })
        .catch(err => {
          assert.isDefined(err.message, "есть поле message");
          assert.isDefined(err.name, "есть поле name");
          assert.isDefined(err.stack, "есть поле stack");
          done();
        });
    });

    it("Закрытие соедения с БД по пустому ORM", done => {
      disconnect({}, api)
        .then(data => {
          assert.isUndefined(data);
          done();
        })
        .catch(err => {
          assert.isDefined(err.message, "есть поле message");
          assert.isDefined(err.name, "есть поле name");
          assert.isDefined(err.stack, "есть поле stack");
          done();
        });
    });
  });
}

module.exports = test;
