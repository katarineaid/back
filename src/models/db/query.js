module.exports = async (params, api) => {
  return exportedFunction(params, api);
};

async function exportedFunction(params, api) {
  const { db, collectionName, query } = params;

  api.logger.info(`Чтение данных из таблицы ${collectionName}`);

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

  try {
    const cursor = db.collection(`${collectionName}`).find(query);

    return cursor
      .toArray()
      .then(documents => {
        return {
          status: true,
          statusText: `Данные из collection ${collectionName} с условием ${JSON.stringify(
            query
          )}`,
          data: documents
        };
      })
      .catch(err => {
        return {
          status: false,
          statusText: `Ошибка при чтении документов collection ${collectionName} с условием ${JSON.stringify(
            query
          )}`,
          data: err
        };
      });
  } catch (e) {
    return {
      status: false,
      statusText: `Ошибка создания cursor для collection ${collectionName} с условием ${JSON.stringify(
        query
      )}`,
      data: {}
    };
  }
}
