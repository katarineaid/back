module.exports = function update(models) {
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

  const projFeaturesPr = features.map(feature => {
    return models.projection({
      feature,
      sourceProj: "mercator",
      targetProj: "wgs84"
    });
  });

  const projFeatures = await Promise.all(projFeaturesPr)
    .then(values => {
      const items = values.reduce((acc, curr) => {
        if (curr.status) {
          return [...acc, curr.data];
        }
        return acc;
      }, []);
      return {
        status: true,
        data: items
      };
    })
    .catch(err => ({
      status: false,
      statusText: "Ошибка перепроецирования",
      data: err
    }));

  if (!projFeatures.status) {
    return projFeatures;
  }

  const forInsert = [];

  const queue = projFeatures.data.reduce((acc, data) => {
    if (data._id !== undefined) {
      acc.push(
        models.db.update({
          db,
          collectionName: id,
          query: { _id: data._id },
          data
        })
      );
    } else {
      forInsert.push(data);
    }
    return acc;
  }, []);

  queue.push(
    models.db.writeData({
      db,
      collectionName: id,
      documents: forInsert
    })
  );

  return Promise.all(queue)
    .then(values => {
      const count = values.reduce((acc, current) => {
        if (current.status && typeof current.data === "number") {
          return acc + 1;
        }
        if (current.status && typeof current.data === "object") {
          return acc + current.data.length;
        }

        return acc;
      }, 0);

      models.db.disconnect({ client });

      return {
        status: true,
        statusText: `Данные слоя ${id} обновлены`,
        data: count
      };
    })
    .catch(err => ({
      status: false,
      statusText: `Ошибка обновлени данных слоя ${id}`,
      data: err
    }));
}
