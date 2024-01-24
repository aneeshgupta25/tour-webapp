const express = require('express');
const {
  getAllTours,
  createTour,
  deleteTour,
  getTour,
  updateTour,
  checkId,
  checkBody
} = require('../controllers/tourController');

const router = express.Router();

// router.param('id', checkId);

router
  .route('/')
  .get(getAllTours)
  .post(createTour)
  // .post(checkBody, createTour);  

router
  .route('/:id')
  .patch(updateTour)
  .delete(deleteTour)
  .get(getTour);

module.exports = router;
