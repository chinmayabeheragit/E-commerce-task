const ApiError = require("./apiError");
const HttpStatus = require("./error.constants");
const sendErrorResponse = require("./error.response");

const errorHandler = (err, req, res, next) => {
  let customError = err;

  if (!(err instanceof ApiError)) {
    customError = new ApiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred",
      [],
      err.stack
    );
  }

  return sendErrorResponse(res, customError);
};

module.exports = errorHandler;
