module.exports = function read(models) {
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
    .query({
      db,
      collectionName: "layers",
      query: { name: id }
    })
    .then(documents => {
      models.db.disconnect({ client });
      if (!documents.status) {
        return documents;
      }
      return {
        status: true,
        statusText: `Параметры слоя ${id}`,
        data: documents.data[0]
      };
    })
    .catch(err => {
      return {
        status: false,
        statusText: `Ошибка в запросе параметров слоя ${id}`,
        data: []
      };
    });
}
