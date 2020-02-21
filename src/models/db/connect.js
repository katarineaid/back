module.exports = async (params, api) => {
  return api.db
    .open(params)
    .then(data => {
      api.logger.info(data.statusText);
      return {
        status: true,
        statusText: "Соединение установлено",
        data
      };
    })
    .catch(err => {
      const error = {
        status: false,
        statusText: "Не удалось установить соединение с БД",
        data: err
      };
      api.logger.error(JSON.stringify(error));
      return error;
    });
};
