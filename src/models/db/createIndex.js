module.exports = async (params, api) => {
  return exportedFunction(params, api);
};

async function exportedFunction(params, api) {
  const { db, collectionName, query } = params;

  api.logger.info(`Создание индекса для коллекции ${collectionName}`);

  if (!db || !db.collection) {
    return {
      status: false,
      statusText: "Нет рабочей модели db",
      data: {}
    };
  }

  if (collectionName === undefined) {
    return {
      status: false,
      statusText: "Нет collectionName",
      data: {}
    };
  }

  if (!query) {
    return {
      status: false,
      statusText: "Нет query",
      data: {}
    };
  }

  return new Promise((fulfilled, rejection) => {
    const collection = db.collection(`${collectionName}`);
    collection.createIndex(query, (err, result) => {
      if (err) {
        fulfilled({
          status: false,
          statusText: "Ошибка создания индекса"
        });
      }
      fulfilled({
        status: true,
        statusText: "Индекса создан",
        data: result
      });
    });
  });
}
