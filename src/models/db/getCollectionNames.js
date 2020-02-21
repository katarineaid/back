module.exports = async (params, api) => {
  return exportedFunction(params, api);
};

async function exportedFunction(params, api) {
  const { db } = params;

  api.logger.info(
    `Returns an array containing the names of all collections and views in the current database`
  );

  if (!db || !db.collection) {
    return {
      status: false,
      statusText: "Нет рабочей модели db",
      data: {}
    };
  }

  return db
    .listCollections()
    .toArray()
    .then(collectionNames => {
      return {
        status: true,
        statusText: `Список доступных коллекций, используемой БД`,
        data: collectionNames
      };
    })
    .catch(err => {
      return {
        status: false,
        statusText: `Ошибка при чтении списка имен коллекций`,
        data: err
      };
    });
}
