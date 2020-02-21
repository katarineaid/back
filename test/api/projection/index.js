const indexProjection = require("../../../src/api/projection");

function test(assert, config, library) {
  const projection = indexProjection(config, library);
  describe("Проверка перепроицирования координат из web-mercator to wgs84", () => {
    const point = [3353428.4283000007, 8357196.5424999967];
    const multiPoint = [point];
    const lineString = [
      [3353428.4283000007, 8357196.5424999967],
      [3353428.5804000013, 8357197.9588999972]
    ];
    const multiLineString = [
      lineString,
      [
        [3387346.7151000015, 8340521.7542999983],
        [3387292.5034000017, 8340709.1017]
      ]
    ];
    const polygon = [
      [
        [3278898.3449999988, 8477216.1545],
        [3278942.8337000012, 8477041.4839000031],
        [3279078.0383, 8477074.3998999968],
        [3279034.1997999996, 8477250.79],
        [3278898.3449999988, 8477216.1545]
      ]
    ];
    const multiPolygon = [
      [
        [
          [3278898.3449999988, 8477216.1545],
          [3278942.8337000012, 8477041.4839000031],
          [3279078.0383, 8477074.3998999968],
          [3279034.1997999996, 8477250.79],
          [3278898.3449999988, 8477216.1545]
        ]
      ],
      [
        [
          [3237098.1284000017, 8501505.1291999966],
          [3237042.8907000013, 8501466.015],
          [3237101.7113999985, 8501386.2934999987],
          [3237157.8449000008, 8501426.9007000029],
          [3237098.1284000017, 8501505.1291999966]
        ]
      ]
    ];

    const sourceProj = "mercator";
    const targetProj = "wgs84";

    const recursionCheck = (assert, origin, other) => {
      if (Array.isArray(other) && Array.isArray(origin)) {
        assert.equal(origin.length, other.length);
        for (let i = 0; i < other.length; i = i + 1) {
          recursionCheck(assert, origin[i], other[i]);
        }
      }
      if (!Array.isArray(other) && !Array.isArray(origin)) {
        assert.typeOf(other, "number");
      }
    };

    it("Не передали параметр type", done => {
      const params = {
        feature: {
          properties: {},
          geometry: {
            type: "",
            coordinates: point
          }
        },
        sourceProj,
        targetProj
      };
      projection(params)
        .then(data => {
          assert.typeOf(data, "object");
          assert.isNotTrue(
            data.status,
            'В теле ответа в поле "status" значение false'
          );
          assert.typeOf(data.statusText, "string");
          assert.equal(
            data.statusText,
            `Неизвестный тип координат type =${params.feature.geometry.type}`
          );
          assert.typeOf(data.data, "object");
          done();
        })
        .catch(err => console.log(err));
    });
    it("Некорретное значение параметра type", done => {
      const params = {
        feature: {
          properties: {},
          geometry: {
            type: "Points",
            coordinates: point
          }
        },
        sourceProj,
        targetProj
      };
      projection(params)
        .then(data => {
          assert.typeOf(data, "object");
          assert.isNotTrue(
            data.status,
            'В теле ответа в поле "status" значение false'
          );
          assert.typeOf(data.statusText, "string");
          assert.equal(
            data.statusText,
            `Неизвестный тип координат type =${params.feature.geometry.type}`
          );
          assert.typeOf(data.data, "object");
          done();
        })
        .catch(err => console.log(err));
    });
    it("Некорретное значение параметра coordinates = null", done => {
      const params = {
        feature: {
          properties: {},
          geometry: {
            type: "Point",
            coordinates: null
          }
        },
        sourceProj,
        targetProj
      };
      projection(params)
        .then(data => {
          assert.typeOf(data, "object");
          assert.isNotTrue(
            data.status,
            'В теле ответа в поле "status" значение false'
          );
          assert.typeOf(data.statusText, "string");
          assert.equal(
            data.statusText,
            "Координаты для конвертации отсутствуют или не являются массивом"
          );
          assert.typeOf(data.data, "object");
          done();
        })
        .catch(err => console.log(err));
    });
    it("Координаты не являются массивом", done => {
      const params = {
        feature: {
          properties: {},
          geometry: {
            type: "Point",
            coordinates: { point }
          }
        },
        sourceProj,
        targetProj
      };
      projection(params)
        .then(data => {
          assert.typeOf(data, "object");
          assert.isNotTrue(
            data.status,
            'В теле ответа в поле "status" значение false'
          );
          assert.typeOf(data.statusText, "string");
          assert.equal(
            data.statusText,
            "Координаты для конвертации отсутствуют или не являются массивом"
          );
          assert.typeOf(data.data, "object");
          done();
        })
        .catch(err => console.log(err));
    });
    it("Не задана система координат feature sourceProj", done => {
      const feature = {
        properties: {},
        geometry: {
          type: "Point",
          coordinates: point
        }
      };
      const params = { feature, sourceProj: null, targetProj };
      projection(params)
        .then(data => {
          assert.typeOf(data, "object");
          assert.isNotTrue(
            data.status,
            'В теле ответа в поле "status" значение false'
          );
          assert.typeOf(data.statusText, "string");
          assert.equal(
            data.statusText,
            `Не задана система координат feature sourceProj =${params.sourceProj}`
          );
          assert.typeOf(data.data, "object");
          done();
        })
        .catch(err => console.log(err));
    });

    it("Не задана система координат feature targetProj", done => {
      const feature = {
        properties: {},
        geometry: {
          type: "Point",
          coordinates: point
        }
      };
      const params = { feature, sourceProj, targetProj: null };
      projection(params)
        .then(data => {
          assert.typeOf(data, "object");
          assert.isNotTrue(
            data.status,
            'В теле ответа в поле "status" значение false'
          );
          assert.typeOf(data.statusText, "string");
          assert.equal(
            data.statusText,
            `Не задана система координат feature targetProj =${params.targetProj}`
          );
          assert.typeOf(data.data, "object");
          done();
        })
        .catch(err => console.log(err));
    });

    it("Корректно переводит координаты Point", done => {
      const params = {
        feature: {
          properties: {},
          geometry: {
            type: "Point",
            coordinates: point
          }
        },
        sourceProj,
        targetProj
      };
      projection(params)
        .then(data => {
          assert.typeOf(data, "object");
          assert.isTrue(
            data.status,
            'В теле ответа в поле "status" значение true'
          );
          assert.typeOf(data.statusText, "string");
          assert.equal(
            data.statusText,
            `Координаты переведены из ${sourceProj} в ${targetProj}`
          );
          assert.isArray(
            data.data.geometry.coordinates,
            "data.data --> массив"
          );
          assert.equal(
            data.data.geometry.coordinates.length,
            point.length,
            "Длина массива корректная"
          );
          assert.typeOf(data.data.geometry.coordinates[0], "number");
          assert.typeOf(data.data.geometry.coordinates[1], "number");
          done();
        })
        .catch(err => console.log(err));
    });

    it("Корректно переводит координаты MultiPoint", done => {
      const params = {
        feature: {
          properties: {},
          geometry: {
            type: "MultiPoint",
            coordinates: multiPoint
          }
        },
        sourceProj,
        targetProj
      };
      projection(params)
        .then(data => {
          assert.typeOf(data, "object");
          assert.isTrue(
            data.status,
            'В теле ответа в поле "status" значение true'
          );
          assert.typeOf(data.statusText, "string");
          assert.equal(
            data.statusText,
            `Координаты переведены из ${sourceProj} в ${targetProj}`
          );
          assert.isArray(
            data.data.geometry.coordinates,
            "data.data.geometry.coordinates --> массив"
          );

          recursionCheck(assert, multiPoint, data.data.geometry.coordinates);
          done();
        })
        .catch(err => console.log(err));
    });

    it("Корректно переводит координаты LineString", done => {
      const params = {
        feature: {
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: lineString
          }
        },
        sourceProj,
        targetProj
      };
      projection(params)
        .then(data => {
          assert.typeOf(data, "object");
          assert.isTrue(
            data.status,
            'В теле ответа в поле "status" значение true'
          );
          assert.typeOf(data.statusText, "string");
          assert.equal(
            data.statusText,
            `Координаты переведены из ${sourceProj} в ${targetProj}`
          );
          assert.isArray(
            data.data.geometry.coordinates,
            "data.data.geometry.coordinates --> массив"
          );
          recursionCheck(assert, lineString, data.data.geometry.coordinates);
          done();
        })
        .catch(err => console.log(err));
    });

    it("Корректно переводит координаты MultiLineString", done => {
      const params = {
        feature: {
          properties: {},
          geometry: {
            type: "MultiLineString",
            coordinates: multiLineString
          }
        },
        sourceProj,
        targetProj
      };
      projection(params)
        .then(data => {
          assert.typeOf(data, "object");
          assert.isTrue(
            data.status,
            'В теле ответа в поле "status" значение true'
          );
          assert.typeOf(data.statusText, "string");
          assert.equal(
            data.statusText,
            `Координаты переведены из ${sourceProj} в ${targetProj}`
          );
          assert.isArray(
            data.data.geometry.coordinates,
            "data.data.geometry.coordinates --> массив"
          );

          recursionCheck(
            assert,
            multiLineString,
            data.data.geometry.coordinates
          );

          done();
        })
        .catch(err => console.log(err));
    });

    it("Корректно переводит координаты Polygon", done => {
      const params = {
        feature: {
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: polygon
          }
        },
        sourceProj,
        targetProj
      };
      projection(params)
        .then(data => {
          assert.typeOf(data, "object");
          assert.isTrue(
            data.status,
            'В теле ответа в поле "status" значение true'
          );
          assert.typeOf(data.statusText, "string");
          assert.equal(
            data.statusText,
            `Координаты переведены из ${sourceProj} в ${targetProj}`
          );
          assert.isArray(
            data.data.geometry.coordinates,
            "data.data.geometry.coordinates --> массив"
          );

          recursionCheck(assert, polygon, data.data.geometry.coordinates);

          done();
        })
        .catch(err => console.log(err));
    });

    it("Корректно переводит координаты MultiPolygon", done => {
      const params = {
        feature: {
          properties: {},
          geometry: {
            type: "MultiPolygon",
            coordinates: multiPolygon
          }
        },
        sourceProj,
        targetProj
      };
      projection(params)
        .then(data => {
          assert.typeOf(data, "object");
          assert.isTrue(
            data.status,
            'В теле ответа в поле "status" значение true'
          );
          assert.typeOf(data.statusText, "string");
          assert.equal(
            data.statusText,
            `Координаты переведены из ${sourceProj} в ${targetProj}`
          );
          assert.isArray(
            data.data.geometry.coordinates,
            "data.data.geometry.coordinates --> массив"
          );

          recursionCheck(assert, multiPolygon, data.data.geometry.coordinates);

          done();
        })
        .catch(err => console.log(err));
    });
  });
}

module.exports = test;
