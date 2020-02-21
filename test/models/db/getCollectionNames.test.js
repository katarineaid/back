const getCollectionNames = require("../../../src/models/db/getCollectionNames");

function test(assert, api) {
  describe("Returns an array containing the names of all collections and views in the current database", () => {
    let client = {};
    let db = {};

    before(function before(done) {
      api.db
        .open({})
        .then(data => {
          client = data.client;
          db = data.db;
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });

    it("Success reading list collections", done => {
      const params = {
        db
      };
      getCollectionNames(params, api)
        .then(response => {
          assert.typeOf(response, "object");
          assert.isTrue(response.status, "");
          assert.equal(
            response.statusText,
            `Список доступных коллекций, используемой БД`
          );
          assert.isArray(response.data, "в свойстве data записан массив");

          const hasFieldName = response.data.every(
            obj => obj.name !== undefined
          );
          assert.isTrue(hasFieldName, "Каждая запись имеет поле 'name'");
          done();
        })
        .catch(err => console.log(err));
    });

    after(function after(done) {
      api.db
        .close({ client })
        .then(() => {
          console.log("Success close connection");
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
}

module.exports = test;
