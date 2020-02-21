module.exports = async (config, library, params) => {

  const { client } = params;

  return client.close().then(() => {
    return {
      status: true,
      statusText: "Соединение с БД закрыто"
    }
  }).catch((err) => {
      return {
        status: false,
        statusText: "Ошибка закрытия соединения",
        data: err
      }
    }
  )
};
