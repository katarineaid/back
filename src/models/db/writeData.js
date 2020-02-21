module.exports = async (params, api) => {
  return exportedFunction(params, api);
};

async function exportedFunction(params, api) {
  const { db, collectionName, documents } = params;

  api.logger.info(`Запись данных в таблицу ${collectionName}`);

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

  if (documents === undefined || !Array.isArray(documents)) {
    return {
      status: false,
      statusText: "Нет documents",
      data: {}
    };
  }

  return db
    .collection(`${collectionName}`)
    .insertMany(documents)
    .then(result => {
      return {
        status: true,
        statusText: `В коллекцию ${collectionName} записано ${result.insertedCount}`,
        data: result.ops
      };
    })
    .catch(err => {
      return {
        status: false,
        statusText: `Ошибка при записи в таблицу ${collectionName}`,
        data: err
      };
    });
}
