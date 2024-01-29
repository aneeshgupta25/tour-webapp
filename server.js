const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception', err.name, err.message);
  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((connectionObject) => {
    // console.log(connectionObject);
    console.log('DB connected!');
  });

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection', err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
