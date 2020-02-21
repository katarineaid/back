const readAll = require("../../../src/models/db/readAll");
const writeData = require("../../../src/models/db/writeData");
const remove = require("../../../src/models/db/remove");

function test(assert, api) {
  describe("Select All Documents in a Collection", () => {
    let client = {};
    let db = {};
    const collectionName = "pointLayer";
    const documents = [
      {
        properties: { code: "VS010-0000023-001-1019", flag: "testing" },
        geometry: {
          type: "Point",
          coordinates: [30.45937343620047, 59.724974062303296]
        }
      },
      {
        properties: { code: "VS010-0000023-001-1021", flag: "testing" },
        geometry: {
          type: "Point",
          coordinates: [30.4583300564727, 59.72510252474582]
        }
      }
    ];
    before(function before(done) {
      api.db
        .open({})
        .then(data => {
          client = data.client;
          db = data.db;
        })
        .then(() => {
          return writeData({ db, collectionName, documents }, api);
        })
        .then(res => {
          console.log(`Was write ${res.data.length} documents`);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });

    it("Success reading from collection", done => {
      const params = {
        db,
        collectionName
      };
      readAll(params, api)
        .then(response => {
          assert.typeOf(response, "object");
          assert.isTrue(response.status, "");
          assert.equal(
            response.statusText,
            `Данные из collection ${collectionName}`
          );
          assert.isArray(response.data, "в свойстве data записан массив");

          done();
        })
        .catch(err => console.log(err));
    });

    after(function after(done) {
      const params = {
        db,
        collectionName,
        query: {
          "properties.flag": "testing"
        }
      };
      remove(params, api)
        .then(data => {
          console.log(`Was delete ${data.data} documents`);
          return api.db.close({ client });
        })
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
