const express = require('express');
const router = express.Router();
const { createBooking, getBookings, updateBookingStatus, deleteBooking } = require('../controllers/bookingController');
const auth = require('../middleware/auth');

router.route('/')
  .post(createBooking)
  .get(auth, getBookings);

router.route('/:id/status')
  .put(auth, updateBookingStatus);

router.route('/:id')
  .delete(auth, deleteBooking);

module.exports = router;

