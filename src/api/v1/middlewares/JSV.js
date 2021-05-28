// *** This middleware ensures that invalid JSON requst won't crash whole app

const { JSON_INVALID } = require("../../../config/constants");
const { ErrorHelper } = require("../helpers/ErrorHelper");

module.exports = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status == 400 && "body" in err) {
    return ErrorHelper(res, JSON_INVALID);
  }

  next();
};
