module.exports = async (params, api) => {
  return exportedFunction(params, api);
};

async function exportedFunction(params, api) {
  const { db, collectionName, query } = params;

  api.logger.info(
    `Удаление документов из collection ${collectionName} с условием ${query}`
  );

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

  return db
    .collection(`${collectionName}`)
    .deleteMany(query)
    .then(result => {
      return {
        status: true,
        statusText: `Удалены документы из collection ${collectionName}`,
        data: result.deletedCount
      };
    })
    .catch(err => {
      return {
        status: false,
        statusText: `Ошибка при удалении документов из коллекции ${collectionName}`,
        data: err
      };
    });
}
