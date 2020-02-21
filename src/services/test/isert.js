module.exports = function isert(models) {
  return async params => {
    return firstFunction(params, models);
  };
};

async function firstFunction(params, models) {
  const Item = i => {
    return {
      x: i,
      y: i
    };
  };

  const dataForWrite = [];
  for (let i = 0; i < 20000; i = i + 1) {
    dataForWrite.push(Item(i));
  }

  const response = await models.db.connect(params);
  if (!response.status) {
    return response;
  }

  const { client, db } = response.data;

  return models.db
    .writeData({
      db,
      collectionName: "testCollection",
      documents: dataForWrite
    })
    .then(response => {
      const layers = response.status ? response.data : [];
      return {
        status: true,
        statusText: `Параметры слоя $testCollection успешно записаны`,
        data: layers
      };
    })
    .then(response => {
      console.log("response--->", response);
      return models.db.createIndex({
        db,
        collectionName: "testCollection",
        query: {
          x: 1,
          y: 1
        }
      });
    })
    .then(index => {
      console.log("index--->", index);
      models.db.disconnect({ client });
      return response;
    })
    .catch(err => ({
      status: false,
      statusText: "Ошибка записи параметров слоя",
      data: err
    }));
}
