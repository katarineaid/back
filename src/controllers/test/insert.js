function insert(testService, logger) {
  return async (req, res) => {
    const params = {
      userId: req.body.userId
    };
    logger.info(`${req.url} ${JSON.stringify(params)}`);
    const data = await testService.insert(params);
    logger.info(JSON.stringify(data));
    res.json(data);
  };
}

module.exports = insert;
