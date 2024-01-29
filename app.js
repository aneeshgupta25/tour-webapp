const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorController = require('./controllers/errorController');
const userRouter = require('./routes/userRouter');
const tourRouter = require('./routes/tourRouter');

const app = express();
// middle-ware
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  err.status = 'failed';
  next(err);
});

app.use(globalErrorController);

module.exports = app;
