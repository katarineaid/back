function testRemove(chai, server, assert) {
  describe("Запрос на удаление объектов слоя", () => {
    const requestData = {
      id: "pointLayer",
      features: []
    };

    before(function before(done) {
      chai
        .request(server)
        .post("/create/features")
        .send({
          id: "pointLayer",
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

    it("Роут должен принять входные данные, вернуть количество удаленных объектов", function test(done) {
      chai
        .request(server)
        .post("/delete/features")
        .send(requestData)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          assert.isDefined(res.body.data);
          done();
        });
    });
  });
}

module.exports = testRemove;
