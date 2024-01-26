const express = require('express');
const {
  getAllTours,
  createTour,
  deleteTour,
  getTour,
  updateTour,
  alias,
  getTourStats,
  getMonthlyPlan,
  checkId,
  checkBody
} = require('../controllers/tourController');

const router = express.Router();

// router.param('id', checkId);

router.route('/top-5-cheap').get(alias, getAllTours);

router.route('/tour-stats').get(getTourStats);

router.route('/monthly-plan/:year').get(getMonthlyPlan);

router
  .route('/')
  .get(getAllTours)
  .post(createTour);
// .post(checkBody, createTour);

router
  .route('/:id')
  .patch(updateTour)
  .delete(deleteTour)
  .get(getTour);

module.exports = router;
