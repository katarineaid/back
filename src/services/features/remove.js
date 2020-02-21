module.exports = function remove(models) {
  return async params => {
    return firstFunction(params, models);
  };
};

async function firstFunction(params, models) {
  const { id, features } = params;
  if (!id) {
    return {
      status: false,
      statusText: "Не передали идентификатор слоя",
      data: {}
    };
  }
  if (!features || !Array.isArray(features)) {
    return {
      status: false,
      statusText: `Ошибка в параметре feature = ${features}`,
      data: {}
    };
  }

  const response = await models.db.connect(params);
  if (!response.status) {
    return response;
  }

  const { client, db } = response.data;

  const queue = features.map(feature => {
    return models.db.remove({
      db,
      collectionName: id,
      query: { _id: feature._id }
    });
  });

  return Promise.all(queue)
    .then(values => {
      const count = values.reduce((acc, current) => {
        if (current.status) {
          return acc + 1;
        }
        return acc;
      }, 0);

      models.db.disconnect({ client });

      return {
        status: true,
        statusText: `Объекты слоя ${id} удалены`,
        data: count
      };
    })
    .catch(err => ({
      status: false,
      statusText: `Ошибка удалении объектов из слоя ${id}`,
      data: err
    }));
}
