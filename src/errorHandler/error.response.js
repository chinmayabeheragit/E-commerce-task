const sendErrorResponse = (res, error) => {
  const { statusCode, message, errors } = error;
  return res.status(statusCode).json({
    success: false,
    message,
    errors: errors.length ? errors : undefined,
  });
};

module.exports = sendErrorResponse;
