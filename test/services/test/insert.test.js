const isertFunc = require("../../../src/services/test/isert");

function test(assert, models, config) {
  describe("Вставка данных", () => {
    let userId = "testUser";
    const isert = isertFunc(models, config);
    it("Успешно", done => {
      const params = {
        userId
      };
      isert(params, models)
        .then(response => {
          assert.isTrue(response.status);
          console.log(response);
          done();
        })
        .catch(err => console.log(err));
    });
  });
}

module.exports = test;
