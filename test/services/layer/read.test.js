const readFunc = require("../../../src/services/layer/read");

function test(assert, models, config) {
  describe("Чтение доступных слоев из БД", () => {
    let userId = "testUser";
    const read = readFunc(models, config);
    it("Успешно", done => {
      const params = {
        userId
      };
      read(params, models)
        .then(response => {
          assert.isTrue(response.status);
          assert.equal(
            response.statusText,
            `Список слоев доступных пользователю ${userId}`
          );

          done();
        })
        .catch(err => console.log(err));
    });
    it("Не передали идентификатор пользователя", done => {
      const params = {
        userId: null
      };
      read(params, models)
        .then(response => {
          assert.isFalse(response.status);
          assert.equal(
            response.statusText,
            "Не передали идентификатор пользователя"
          );
          done();
        })
        .catch(err => console.log(err));
    });
  });
}

module.exports = test;
