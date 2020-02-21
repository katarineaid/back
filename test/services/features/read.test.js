const readFunc = require("../../../src/services/features/read");
const createFunc = require("../../../src/services/features/create");
const removeFunc = require("../../../src/services/features/remove");

function test(assert, models, config) {
  describe("Чтение данных слоя из БД", () => {
    let id = "pointLayer";
    const read = readFunc(models, config);
    const create = createFunc(models, config);
    const remove = removeFunc(models, config);
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

    it("Успешно", done => {
      const params = {
        id
      };
      read(params, models)
        .then(response => {
          assert.isTrue(response.status);
          assert.equal(
            response.statusText,
            `Данные слоя ${params.id} успешно прочитаны`
          );
          assert.equal(response.data.type, "FeatureCollection");
          assert.equal(response.data.crs.type, "name");
          assert.equal(response.data.crs.properties.name, "EPSG:3857");
          assert.isDefined(response.data.features);
          assert.isArray(response.data.features);

          done();
        })
        .catch(err => console.log(err));
    });
    it("Не передали идентификатор слоя", done => {
      const params = {
        id: null
      };
      read(params, models)
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
