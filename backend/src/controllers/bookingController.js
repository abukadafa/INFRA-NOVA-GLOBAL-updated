const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const jsonStore = require('../config/jsonStore');

function isDbConnected() {
  return mongoose.connection && mongoose.connection.readyState === 1;
}

// @desc    Create new inspection booking
// @route   POST /api/bookings
// @access  Public
exports.createBooking = async (req, res) => {
  try {
    const { propertyName, fullName, email, phone, date, time, message } = req.body;

    // Basic Validation
    if (!propertyName || !fullName || !email || !phone || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: propertyName, fullName, email, phone, date, time'
      });
    }

    const bookingPayload = {
      propertyName,
      fullName,
      email,
      phone,
      date,
      time,
      message: message || '',
      status: 'pending'
    };

    let booking;
    if (isDbConnected()) {
      booking = await Booking.create(bookingPayload);
    } else {
      booking = jsonStore.addBooking(bookingPayload);
    }

    res.status(201).json({
      success: true,
      message: 'Inspection scheduled successfully!',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error scheduling inspection',
      error: error.message
    });
  }
};

// @desc    Get all bookings (For admin review)
// @route   GET /api/bookings
// @access  Private
exports.getBookings = async (req, res) => {
  try {
    let bookings;
    if (isDbConnected()) {
      bookings = await Booking.find().sort({ createdAt: -1 });
    } else {
      bookings = jsonStore.getBookings();
    }

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error fetching bookings',
      error: error.message
    });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be pending, confirmed, or cancelled.'
      });
    }

    let updated;
    if (isDbConnected()) {
      updated = await Booking.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      );
    } else {
      updated = jsonStore.updateBooking(req.params.id, { status });
    }

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `Booking with ID ${req.params.id} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error updating booking',
      error: error.message
    });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
exports.deleteBooking = async (req, res) => {
  try {
    let success = false;
    if (isDbConnected()) {
      const deleted = await Booking.findByIdAndDelete(req.params.id);
      success = !!deleted;
    } else {
      success = jsonStore.deleteBooking(req.params.id);
    }

    if (!success) {
      return res.status(404).json({
        success: false,
        message: `Booking with ID ${req.params.id} not found`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error deleting booking',
      error: error.message
    });
  }
};

