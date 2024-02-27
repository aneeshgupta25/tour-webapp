const express = require('express');
const authController = require('./../controllers/authController');
const bookingsController = require('./../controllers/bookingsController');

const router = express.Router();

router.use(authController.protect);
// tourID is URL parameter
router.get('/checkout-session/:tourID', bookingsController.getCheckoutSession);

router.use(authController.restrictTo('admin', 'lead-guide'));
router
  .route('/')
  .get(bookingsController.getAllBookings)
  .post(bookingsController.createBooking);
router
  .route('/:id')
  .get(bookingsController.getBooking)
  .patch(bookingsController.updateBooking)
  .delete(bookingsController.deleteBooking);

module.exports = router;
