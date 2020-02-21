module.exports = function read(models) {
  return async params => {
    return firstFunction(params, models);
  };
};

async function firstFunction(params, models) {
  const { userId } = params;
  if (!userId) {
    return {
      status: false,
      statusText: "Не передали идентификатор пользователя",
      data: {}
    };
  }

  const response = await models.db.connect(params);
  if (!response.status) {
    return response;
  }

  const { client, db } = response.data;

  return models.db
    .readAll({
      db,
      collectionName: "layers"
    })
    .then(documents => {
      models.db.disconnect({ client });
      return documents;
    })
    .then(documents => {
      if (!documents.status) {
        return documents;
      }
      return {
        status: true,
        statusText: `Список слоев доступных пользователю ${userId}`,
        data: documents.data.map(document => document.name)
      };
    })
    .catch(err => {
      return {
        status: false,
        statusText: "Ошибка в запросе списка слоев",
        data: []
      };
    });
}
