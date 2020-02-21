function create(layerService, logger) {
  return async (req, res) => {
    const params = {
      id: req.body.id,
      name: req.body.name,
      objectIdFieldName: req.body.objectIdFieldName,
      globalIdFieldName: req.body.globalIdFieldName,
      geometryType: req.body.geometryType,
      spatialReference: req.body.spatialReference,
      fields: req.body.fields,
      displayField: req.body.displayField
    };
    logger.info(`${req.url} ${JSON.stringify(params)}`);
    const data = await layerService.create(params);
    logger.info(JSON.stringify(data));
    res.json(data);
  };
}

module.exports = create;
