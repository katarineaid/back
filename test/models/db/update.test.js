const update = require("../../../src/models/db/update");
const writeData = require("../../../src/models/db/writeData");
const remove = require("../../../src/models/db/remove");

function test(assert, api) {
  describe("Modifies and returns a single document in a Collection", () => {
    let client = {};
    let db = {};
    const collectionName = "pointLayer";
    const documents = [
      {
        type: "Feature",
        properties: { code: "VS010-0000030-001-1034", flag: "testing" },
        geometry: {
          type: "Point",
          coordinates: [30.448668007245427, 59.72312548641517]
        }
      },
      {
        type: "Feature",
        properties: { code: "VS010-0000030-501-1002", flag: "testing" },
        geometry: {
          type: "Point",
          coordinates: [30.444580440937333, 59.720286030168005]
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

    it("Find and Modify document that Match a Condition", done => {
      const params = {
        db,
        collectionName,
        query: {
          "properties.flag": { $eq: "testing" }
        },
        data: {
          properties: { flag: "remove" }
        }
      };

      update(params, api)
        .then(response => {
          assert.typeOf(response, "object");
          assert.isTrue(response.status, "");
          assert.equal(
            response.statusText,
            `Обновлены документы из коллекции ${collectionName}`
          );
          done();
          assert.isNumber(
            response.data,
            "number of features, with was modified"
          );
          console.log(`Was updated ${response.data}`);
        })
        .catch(err => console.log(err));
    });

    after(function after(done) {
      const params = {
        db,
        collectionName,
        query: {
          "properties.flag": "remove"
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
