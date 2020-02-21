module.exports = function remove(models) {
  return async params => {
    return firstFunction(params, models);
  };
};

async function firstFunction(params, models) {
  const { id } = params;
  if (!id) {
    return {
      status: false,
      statusText: "Не передали идентификатор слоя",
      data: {}
    };
  }

  const response = await models.db.connect(params);
  if (!response.status) {
    return response;
  }

  const { client, db } = response.data;

  return models.db
    .remove({
      db,
      collectionName: "layers",
      query: { name: id }
    })
    .then(response => {
      models.db.disconnect({ client });

      if (!response.status) {
        return response;
      }

      return {
        status: true,
        statusText: `Слой ${id} удален`,
        data: response.data
      };
    })
    .catch(err => ({
      status: false,
      statusText: `Ошибка при удалении слоя ${id}`,
      data: err
    }));
}
