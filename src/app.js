const createError = require("http-errors");
const express = require("express");
const cors = require("express-cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const router = express.Router();

const clsMiddleware = require("./bindTraceId");
const config = require("./config");
const logger = require("../middleware/logger");
const Models = require("./models");
let api = require("./api");
const controllers = require("./controllers");
const services = require("./services");

api = api(config, logger);
const models = new Models(api);
const servicesLayer = services(models, config);
controllers(servicesLayer, router, logger);

app.use(
  cors({
    allowedOrigins: ["http://localhost:*"]
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(clsMiddleware);

logger.info(`HOST:${config.address}, PORT:${process.env.PORT}`);

app.use("/", router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
