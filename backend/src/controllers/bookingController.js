const Booking = require('../models/Booking');

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

    // Save booking request
    const booking = await Booking.create({
      propertyName,
      fullName,
      email,
      phone,
      date,
      time,
      message: message || ''
    });

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

// @desc    Get all bookings (For admin/internal review)
// @route   GET /api/bookings
// @access  Private (Placeholder for dashboard build-out)
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
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
