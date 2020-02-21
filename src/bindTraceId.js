const cls = require("cls-hooked");
const nanoid = require("nanoid");

const clsNamespace = cls.createNamespace("app");

const clsMiddleware = (req, res, next) => {
  clsNamespace.bind(req);
  clsNamespace.bind(res);
  const traceID = nanoid();

  clsNamespace.run(() => {
    clsNamespace.set("traceID", traceID);
    next();
  });
};

module.exports = clsMiddleware;
