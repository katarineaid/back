function update(featuresService, logger) {
  return async (req, res) => {
    const params = {
      id: req.body.id,
      features: req.body.features
    };
    logger.info(`${req.url} ${JSON.stringify(params)}`);
    const data = await featuresService.update(params);
    logger.info(JSON.stringify(data));
    res.json(data);
  };
}

module.exports = update;
