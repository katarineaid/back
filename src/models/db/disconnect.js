module.exports = async (params, api) => {
  return api.db
  .close(params)
  .then(data => {
    api.logger.info(data.statusText);
    return data;
  })
  .catch(err => {
    const error = {
      status: false,
      statusText: "Не удалось закрыть соединение с БД",
      data: err
    };
    api.logger.error(JSON.stringify(error));
    return error;
  });
};
