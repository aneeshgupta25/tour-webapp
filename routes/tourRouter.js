const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('./../controllers/authController');

const router = express.Router();

// router.param('id', checkId);

router
  .route('/top-5-cheap')
  .get(tourController.alias, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .patch(tourController.updateTour)
  .delete(
    // Middleware stack in order
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    // Controller for this action
    tourController.deleteTour,
  )
  .get(tourController.getTour);

module.exports = router;
