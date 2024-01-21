const express = require('express');
const fs = require('fs');

const router = express.Router();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  // route handler
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;

  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  const tour = tours.find(el => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour
    }
  });
};

const updateTour = (req, res) => {
  const id = req.params.id;
  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  return res.status(200).json({
    status: 'success',
    data: 'Updated Tour!'
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id;
  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  return res.status(204).json({
    status: 'success',
    data: null
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = {
    id: newId,
    ...req.body
  };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

router
  .route('/')
  .get(getAllTours)
  .post(createTour);

router
  .route('/:id')
  .patch(updateTour)
  .delete(deleteTour)
  .get(getTour);

module.exports = router;
