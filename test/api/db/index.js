const open = require("../../../src/api/db/open");
const close = require("../../../src/api/db/close");

function test(assert, config, library) {
  describe("Проверка подключения и закрытия соединения к БД", () => {
    let client = {};
    it("Подключение к mongo", done => {
      open(config, library, {})
        .then(data => {
          assert.typeOf(data, "object");
          assert.isDefined(data.client, "client определен");
          assert.isDefined(data.db, "db определен");
          client = data.client;
          done();
        })
        .catch(err => console.log(err));
    });
    it("Закрытие соедения с БД SQLite", done => {
      close(config, library, { client })
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
      const brokenConfig = {
        url: "",
        dbName: ""
      };
      open(brokenConfig, library, {})
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
      close(config, library, {})
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
