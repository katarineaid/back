function testUpdate(chai, server, assert) {
  describe("Запрос на обновление объектов слоя", () => {
    const id = "pointLayer";
    const requestData = {
      id,
      features: []
    };

    before(function before(done) {
      chai
        .request(server)
        .post("/create/features")
        .send({
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
        })
        .end((err, res) => {
          requestData.features = res.body.data.features;
          done();
        });
    });

    it("Роут должен принять входные данные, вернуть количество обновенных объектов слоя", function test(done) {
      chai
        .request(server)
        .post("/update/features")
        .send(requestData)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          assert.isDefined(res.body.data);
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

module.exports = testUpdate;
