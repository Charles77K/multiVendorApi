const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `invalid ${err.value} : ${err.path}`;
  return new AppError(message, 400);
};

const handleDuplicateError = (err) => {
  const message = `Duplicate field value: ${err.keyValue.name}, please enter another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const value = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid Input Data: ${value.join('. ')}`;
  return new AppError(message, 400);
};

const handleJsonWebTokenErrorDB = () =>
  new AppError('Invalid token. Please login again', 401);

const handleTokenExpiredErrorDB = () =>
  new AppError('Token expired. Please login again', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  //Operational error
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //programming or other unknown error
    console.log('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong, try again later',
    });
  }
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.name === 'CastError') {
      error = handleCastErrorDB(error);
      console.log(error);
    }
    if (err.code === 11000) {
      error = handleDuplicateError(error);
    }
    if (err.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }
    if (err.name === 'JsonWebTokenError') {
      error = handleJsonWebTokenErrorDB();
    }
    if (err.name === 'TokenExpiredError') {
      error = handleTokenExpiredErrorDB();
    }
    sendErrorProd(error, res);
  }
};
