const createFunc = require("../../../src/services/features/create");
const removeFunc = require("../../../src/services/features/remove");

function test(assert, models, config) {
  describe("Write features in layer", () => {
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

    it("Write features that was send by client", function wait(done) {
      const params = {
        id,
        features
      };
      create(params)
        .then(response => {
          assert.typeOf(response, "object");
          assert.isTrue(response.status, "");
          assert.equal(
            response.statusText,
            `Объекты слоя ${id} успешно записаны`
          );
          assert.equal(response.data.type, "FeatureCollection");
          assert.equal(response.data.crs.type, "name");
          assert.equal(response.data.crs.properties.name, "EPSG:3857");
          assert.isDefined(response.data.features);
          assert.isArray(response.data.features);

          features = response.data.features;
          console.log(`Was created ${response.data.features.length}`);

          done();
        })
        .catch(err => console.log(err));
    });

    it("Не передали идентификатор слоя", done => {
      const params = {
        id: null
      };
      create(params, models)
        .then(response => {
          assert.isFalse(response.status);
          assert.equal(response.statusText, "Не передали идентификатор слоя");
          done();
        })
        .catch(err => console.log(err));
    });

    after(function after(done) {
      remove({
        id,
        features
      })
        .then(data => {
          console.log(`Was delete ${data.data} documents`);
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
