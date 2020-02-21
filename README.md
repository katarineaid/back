### GeoStorage
The package is server application on ```Node.js```, which help manage store geographic data in ```mongodb```.

### End-points

#### `post` /read/layers
```json
{
  "userId": "testUser"
}
```
**Response**
```json
{
  "status": "boolean",
  "statusText": "string",
  "data": "array of strings"
}
```
#### `post` /read/features
```json
{
  "id": "string"
}
```

```id``` - идентификатор слоя

**Response**
```json
{
  "status": "boolean",
  "statusText": "string",
  "data": {
            "type": "FeatureCollection",
            "crs": {
              "type": "name",
              "properties": {
                "name": "EPSG:3857"
              }
            },
            "features": "array of features"
  }
}
```
**feature**
```json
{
  "type": "Feature",
  "properties": "object, which describe feature",
  "geometry": {
     "type": "Point / MultiPoint / LineString / MultiLineString / Polygon / MultiPolygon",
     "coordinates": "array of coordinates"
     }
}
```
#### `post` /create/features
```json
{
  "id": "string",
  "features": "array of features"
}
```

```id``` - идентификатор слоя

**Response**
```json
{
  "status": "boolean",
  "statusText": "string",
  "data": {
            "type": "FeatureCollection",
            "crs": {
              "type": "name",
              "properties": {
                "name": "EPSG:3857"
              }
            },
            "features": "array of features, which was recorded in layer"
  }
}
```
#### `post` /update/features
```json
{
  "id": "string",
  "features": "array of features"
}
```

```id``` - идентификатор слоя

**Response**
```json
{
  "status": "boolean",
  "statusText": "string",
  "data":  "number of features, with was modified"
}
```
#### `post` /delete/features
```json
{
  "id": "string",
  "features": "array of features"
}
```

```id``` - идентификатор слоя

**Response**
```json
{
  "status": "boolean",
  "statusText": "string",
  "data":  "number of features, with was deleted"
}
```