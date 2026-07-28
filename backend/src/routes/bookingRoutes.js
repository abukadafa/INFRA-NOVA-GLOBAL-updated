const express = require('express');
const router = express.Router();
const { createBooking, getBookings } = require('../controllers/bookingController');
const auth = require('../middleware/auth');

router.route('/')
  .post(createBooking)
  .get(auth, getBookings);

module.exports = router;
