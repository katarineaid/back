module.exports = function read(models) {
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

  return models.db
    .writeData({
      db,
      collectionName: id,
      documents: features
    })
    .then(response => {
      models.db.disconnect({ client });
      return response;
    })
    .then(response => {
      const features = response.status ? response.data : [];
      return {
        status: true,
        statusText: `Объекты слоя ${id} успешно записаны`,
        data: {
          type: "FeatureCollection",
          crs: {
            type: "name",
            properties: {
              name: "EPSG:3857"
            }
          },
          features: features
        }
      };
    })
    .catch(err => ({
      status: false,
      statusText: "Ошибка записи объектов в слой",
      data: err
    }));
}
