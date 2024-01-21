const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRouter');
const tourRouter = require('./routes/tourRouter');

const app = express();
// middle-ware
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
