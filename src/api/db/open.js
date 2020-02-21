module.exports = async (config, library, params) => {
  const { mongodb } = library;
  const MongoClient = mongodb.MongoClient;

  const { url, dbName } = config;

  const client = new MongoClient(url, { useUnifiedTopology: true });

  return new Promise((fulfill, reject) => {
    client.connect(err => {
      if (err) {
        return reject(err);
      }

      const db = client.db(dbName);

      return fulfill({ client, db });
    });
  });
};
