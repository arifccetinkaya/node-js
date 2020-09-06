const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.code = -1;

  //log console for dev
  console.log(err);

  //mongoose bad objecID
  if (err.name === 'CastError') {
    const message = `Bootcamp not found with if of ${err.value}`;
    error = new ErrorResponse(1, message, 404);
  }

  //mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(2, message, 400);
  }

  //mongoose validation error
  if (err.name === 'CastError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(3, message, 400);
  }

  //mongoose not allowed error
  if (err.code === 8000) {
    const message = 'User not allowed to perform this operation';
    error = new ErrorResponse(4, message, 403);
  }

  //handle with bad request
  if (err.message === 'Bad Request') {
    const message = 'Missing search parameter';
    error = new ErrorResponse(5, message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ code: error.code, message: error.message });
};

module.exports = errorHandler;
