module.exports = async (params, api) => {
  return exportedFunction(params, api);
};

async function exportedFunction(params, api) {
  const { db, collectionName } = params;

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

  try {
    const cursor = db.collection(`${collectionName}`).find({});

    return cursor
      .toArray()
      .then(documents => {
        return {
          status: true,
          statusText: `Данные из collection ${collectionName}`,
          data: documents
        };
      })
      .catch(err => {
        return {
          status: false,
          statusText: `Ошибка при чтении документов collection ${collectionName}`,
          data: err
        };
      });
  } catch (e) {
    return {
      status: false,
      statusText: `Ошибка создания cursor для collection ${collectionName}`,
      data: {}
    };
  }
}
