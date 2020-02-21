function testCreate(chai, server, assert) {
  describe("Запрос на добавление объектов слоя", () => {
    const id = "pointLayer";
    const requestData = {
      id,
      features: [
        {
          type: "Feature",
          properties: { code: "VS006-0000109-001-1001", flag: "testing" },
          geometry: {
            type: "Point",
            coordinates: [3383516.4177, 8356046.204700001]
          }
        }
      ]
    };

    it("Роут должен принять входные данные, вернуть добавленные на слой объекты", function test(done) {
      chai
        .request(server)
        .post("/create/features")
        .send(requestData)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          assert.isDefined(res.body.data);
          assert.isArray(res.body.data);
          requestData.features = res.body.data.features;
          done();
        });
    });

    after(function after(done) {
      chai
        .request(server)
        .post("/delete/features")
        .send({
          id,
          features: requestData.features
        })
        .end((err, res) => {
          console.log(res.body.statusText);
          done();
        });
    });
  });
}

module.exports = testCreate;
