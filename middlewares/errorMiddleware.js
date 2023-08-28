const notFoundErrorHandler = (err, req, res, next) => {
  if (res.statusCode === 404) {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.status(404);
    next(error);
  } else {
    next(err);
  }
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message;

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  notFoundErrorHandler,
  errorHandler,
};
