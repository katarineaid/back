module.exports = async (params, api) => {
  return exportedFunction(params, api);
};

async function exportedFunction(params, api) {
  const { db, collectionName, query, data } = params;

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

  if (query === undefined) {
    return {
      status: false,
      statusText: "Нет query",
      data: {}
    };
  }

  if (data === undefined) {
    return {
      status: false,
      statusText: "Нет data",
      data: {}
    };
  }

  /** так работать не будет! см. тест update.test.js
   *  query: {
        properties: { flag: { $eq: "testing" } }
               }
   * */

  return db
    .collection(`${collectionName}`)
    .updateMany(query, { $set: data })
    .then(result => {
      return {
        status: true,
        statusText: `Обновлены документы из коллекции ${collectionName}`,
        data: result.matchedCount
      };
    })
    .catch(err => {
      return {
        status: false,
        statusText: `Ошибка при обновлении документов коллекции ${collectionName}`,
        data: err
      };
    });
}
