module.exports = function read(models) {
  return async params => {
    return firstFunction(params, models);
  };
};

async function firstFunction(params, models) {
  const {
    name,
    objectIdFieldName,
    globalIdFieldName,
    geometryType,
    spatialReference,
    fields,
    displayField
  } = params;
  if (!name) {
    return {
      status: false,
      statusText: "Не передали name",
      data: {}
    };
  }
  if (!objectIdFieldName) {
    return {
      status: false,
      statusText: "Не передали objectIdFieldName",
      data: {}
    };
  }

  if (!globalIdFieldName) {
    return {
      status: false,
      statusText: "Не передали globalIdFieldName",
      data: {}
    };
  }

  if (!geometryType) {
    return {
      status: false,
      statusText: "Не передали geometryType",
      data: {}
    };
  }

  if (!spatialReference) {
    return {
      status: false,
      statusText: "Не передали spatialReference",
      data: {}
    };
  }

  if (!fields || !Array.isArray(fields) || fields.length === 0) {
    return {
      status: false,
      statusText: `Ошибка в параметре fields = ${fields}`,
      data: {}
    };
  }

  const fieldForDisplay = displayField ? displayField : fields[0];

  const response = await models.db.connect(params);
  if (!response.status) {
    return response;
  }

  const { client, db } = response.data;

  return models.db
    .writeData({
      db,
      collectionName: "layers",
      documents: [
        {
          name,
          objectIdFieldName,
          globalIdFieldName,
          geometryType,
          spatialReference,
          fields,
          displayField: fieldForDisplay
        }
      ]
    })
    .then(response => {
      models.db.disconnect({ client });
      return response;
    })
    .then(response => {
      const layers = response.status ? response.data : [];
      return {
        status: true,
        statusText: `Параметры слоя ${name} успешно записаны`,
        data: layers
      };
    })
    .catch(err => ({
      status: false,
      statusText: "Ошибка записи параметров слоя",
      data: err
    }));
}
