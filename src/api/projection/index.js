const proj = require("../../config/projection");

// todo написать реализацию конвертации GeometryCollection

module.exports = (config, library) => {
  const { proj4 } = library;

  return async params => {
    const {
      feature: {
        geometry: { type, coordinates },
        ...other
      },
      sourceProj,
      targetProj
    } = params;

    const enumTypes = [
      "Point",
      "MultiPoint",
      "LineString",
      "MultiLineString",
      "Polygon",
      "MultiPolygon"
      // "GeometryCollection"
    ];
    if (!type || !enumTypes.includes(type)) {
      return {
        status: false,
        statusText: `Неизвестный тип координат type =${type}`,
        data: {}
      };
    }

    if (!coordinates || !Array.isArray(coordinates)) {
      return {
        status: false,
        statusText:
          "Координаты для конвертации отсутствуют или не являются массивом",
        data: {}
      };
    }

    if (!sourceProj || proj[sourceProj] === undefined) {
      return {
        status: false,
        statusText: `Не задана система координат feature sourceProj =${sourceProj}`,
        data: {}
      };
    }

    if (!targetProj || proj[targetProj] === undefined) {
      return {
        status: false,
        statusText: `Не задана система координат feature targetProj =${targetProj}`,
        data: {}
      };
    }

    const point = ([x, y]) => {
      try {
        return proj4(proj[sourceProj], proj[targetProj], [x, y]);
      } catch (e) {
        return [x, y];
      }
    };

    const multiPoint = pairs => {
      return pairs.map(pair => point(pair));
    };

    const lineString = pairs => {
      return pairs.map(pair => point(pair));
    };

    const multiLineString = lines => {
      return lines.map(line => lineString(line));
    };

    const polygon = lines => {
      return lines.map(line => lineString(line));
    };

    const multiPolygon = polygons => {
      return polygons.map(lines => polygon(lines));
    };

    const geometryCollection = collection => {
      return collection;
    };

    const fabric = {
      Point: point,
      MultiPoint: multiPoint,
      LineString: lineString,
      MultiLineString: multiLineString,
      Polygon: polygon,
      MultiPolygon: multiPolygon,
      GeometryCollection: geometryCollection
    };

    const conversionFunc = fabric[type];

    const repCoordinates = conversionFunc(coordinates);

    return {
      status: true,
      statusText: `Координаты переведены из ${sourceProj} в ${targetProj}`,
      data: {
        geometry: {
          type,
          coordinates: repCoordinates
        },
        ...other
      }
    };
  };
};
