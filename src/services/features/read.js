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

  const documents = await models.db.readAll({
    db,
    collectionName: id
  });

  if (!documents.status) {
    return documents;
  }

  models.db.disconnect({ client });

  const features = documents.data.map(feature => {
    return models.projection({
      feature,
      sourceProj: "wgs84",
      targetProj: "mercator"
    });
  });

  return Promise.all(features)
    .then(values => {
      const items = values.reduce((acc, curr) => {
        if (curr.status) {
          return [...acc, curr.data];
        }
        return acc;
      }, []);
      return {
        status: true,
        statusText: `Данные слоя ${id} успешно прочитаны`,
        data: {
          type: "FeatureCollection",
          crs: {
            type: "name",
            properties: {
              name: "EPSG:3857"
            }
          },
          features: items
        }
      };
    })
    .catch(err => ({
      status: false,
      statusText: "Ошибка перепроецирования",
      data: err
    }));
}
