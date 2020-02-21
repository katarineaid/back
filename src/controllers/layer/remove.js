function remove(layerService, logger) {
  return async (req, res) => {
    const params = {
      id: req.body.id
    };
    logger.info(`${req.url} ${JSON.stringify(params)}`);
    const data = await layerService.remove(params);
    logger.info(JSON.stringify(data));
    res.json(data);
  };
}

module.exports = remove;
