const AppError = require('../utils/appError');

const handleCastErorrDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors)
    .map((el) => el.message)
    .join('. ');
  const message = `Invalid Input Data: ${errors}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) => new AppError('Invalid Token', 401);

handleJWTExpiredError = (err) =>
  new AppError('Your Token has expired. Kindly login again', 401);

const sendErrorDev = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else {
    // RENDERED MESSAGE
    res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong!',
    });
  }
  // RENDERED MESSAGE
  if (err.isOperational) {
    res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  } else {
    res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: 'Please try again later!',
    });
  }
};

module.exports = (err, req, res, next) => {
  console.log(err.message)
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { name: err.name, ...err };
    error.message = err.message;
    if (error.name === 'CastError') error = handleCastErorrDB(err);
    if (error.code === 11000) error = handleDuplicateFieldsDB(err);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (sendErrorProd.name === 'JsonWebTokenError') error = handleJWTError(err);
    if (sendErrorProd.name === 'TokenExpiredError')
      error = handleJWTExpiredError(err);

    sendErrorProd(error, req, res);
  }
};
