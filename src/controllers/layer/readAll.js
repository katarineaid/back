function read(layerService, logger) {
  return async (req, res) => {
    const params = {
      userId: req.body.userId
    };
    logger.info(`${req.url} ${JSON.stringify(params)}`);
    const data = await layerService.readAll(params);
    logger.info(JSON.stringify(data));
    res.json(data);
  };
}

module.exports = read;
