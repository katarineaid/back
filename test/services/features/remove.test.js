const removeFunc = require("../../../src/services/features/remove");
const createFunc = require("../../../src/services/features/create");

function test(assert, models, config) {
  describe("Delete features from layer", () => {
    const remove = removeFunc(models, config);
    const create = createFunc(models, config);
    const id = "pointLayer";

    let features = [
      {
        type: "Feature",
        properties: { code: "VS006-0000109-001-1001", flag: "testing" },
        geometry: {
          type: "Point",
          coordinates: [3383516.4177, 8356046.204700001]
        }
      },
      {
        type: "Feature",
        properties: { code: "VS010-0000023-001-1007", flag: "testing" },
        geometry: {
          type: "Point",
          coordinates: [3391728.6385000013, 8338543.472199999]
        }
      },
      {
        type: "Feature",
        properties: { code: "VS010-0000023-001-1010", flag: "testing" },
        geometry: {
          type: "Point",
          coordinates: [3391459.202300001, 8338447.4690999985]
        }
      }
    ];

    before(function before(done) {
      create({
        id,
        features
      })
        .then(response => {
          features = response.status ? response.data.features : [];
          console.log(`Was created ${features.length} documents`);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });

    it("Delete features that was send by client", function wait(done) {
      const params = {
        id,
        features
      };

      remove(params)
        .then(response => {
          assert.typeOf(response, "object");
          assert.isTrue(response.status, "");
          assert.equal(response.statusText, `Объекты слоя ${id} удалены`);
          assert.isNumber(
            response.data,
            "number of features, with was deleted"
          );
          console.log(`Was deleted ${response.data}`);
          done();
        })
        .catch(err => console.log(err));
    });
  });
}

module.exports = test;
