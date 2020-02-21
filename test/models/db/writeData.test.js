const writeData = require("../../../src/models/db/writeData");
const remove = require("../../../src/models/db/remove");

function test(assert, api) {
  describe("Insert documents in collection", () => {
    let client = {};
    let db = {};
    const collectionName = "pointLayer";
    const documents = [
      {
        type: "Feature",
        properties: { code: "VS010-0000023-001-1019", flag: "testing" },
        geometry: {
          type: "Point",
          coordinates: [30.45937343620047, 59.724974062303296]
        }
      },
      {
        type: "Feature",
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
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });

    it("Success write some features in collection", done => {
      const params = {
        db,
        collectionName,
        documents
      };
      writeData(params, api)
        .then(response => {
          assert.typeOf(response, "object");
          assert.equal(
            response.statusText,
            `В коллекцию ${params.collectionName} записано ${params.documents.length}`
          );
          assert.isArray(response.data);
          assert.equal(response.data.length, params.documents.length);
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
