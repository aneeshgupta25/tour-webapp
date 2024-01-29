const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('./../models/tourModel');
dotenv.config({ path: '../config.env' });

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
  })
  .catch((err) => {
    // console.log(err);
  });


const tours = JSON.parse(fs.readFileSync('data/tours-simple.json', 'utf-8'));
const importData = async () => {
    try {
        await Tour.create(tours)
        console.log('Successfully added to DB')
    } catch(err) {
        // console.log(err);
    }
    process.exit()
}

const deleteExistingData = async () => {
    try {
        await Tour.deleteMany()
        console.log('Successfully deleted!');        
    } catch(err) {
        // console.log(err)
    }
    process.exit()
}

if(process.argv[2] === '--import') {
    importData()
} else if(process.argv[2] === '--delete') {
    deleteExistingData()
}

// console.log(process.argv)