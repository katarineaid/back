function testRead(chai, server, assert) {
  describe("Запрос на получение данных слоя", () => {
    const id = "pointLayer";
    const requestData = {
      id
    };

    it("Роут должен принять входные данные, вернуть объекты запрашиваемого слоя", function test(done) {
      chai
        .request(server)
        .post("/read/features")
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

module.exports = testRead;
