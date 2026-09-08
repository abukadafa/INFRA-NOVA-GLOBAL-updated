const mongoose = require('mongoose');
const Distributor = require('../models/Distributor');
const jsonStore = require('../config/jsonStore');

function isDbConnected() {
  return mongoose.connection && mongoose.connection.readyState === 1;
}

// @desc    Submit distributor application
// @route   POST /api/distributors
// @access  Public
exports.createDistributor = async (req, res) => {
  try {
    const { fullName, companyName, phone, location, businessType, volume, notes } = req.body;

    if (!fullName || !companyName || !phone || !location || !businessType || !volume) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: fullName, companyName, phone, location, businessType, volume'
      });
    }

    const payload = {
      fullName,
      companyName,
      phone,
      location,
      businessType,
      volume,
      notes: notes || '',
      status: 'new'
    };

    let record;
    if (isDbConnected()) {
      record = await Distributor.create(payload);
    } else {
      record = jsonStore.addDistributor(payload);
    }

    res.status(201).json({
      success: true,
      message: 'Distributor application submitted successfully!',
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error saving distributor application',
      error: error.message
    });
  }
};

// @desc    Get all distributor applications
// @route   GET /api/distributors
// @access  Private
exports.getDistributors = async (req, res) => {
  try {
    let distributors;
    if (isDbConnected()) {
      distributors = await Distributor.find().sort({ createdAt: -1 });
    } else {
      distributors = jsonStore.getDistributors();
    }

    res.status(200).json({
      success: true,
      count: distributors.length,
      data: distributors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error fetching distributor applications',
      error: error.message
    });
  }
};

// @desc    Update distributor status
// @route   PUT /api/distributors/:id/status
// @access  Private
exports.updateDistributorStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['new', 'contacted', 'approved', 'declined'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be new, contacted, approved, or declined.'
      });
    }

    let updated;
    if (isDbConnected()) {
      updated = await Distributor.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      );
    } else {
      updated = jsonStore.updateDistributor(req.params.id, { status });
    }

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `Distributor application with ID ${req.params.id} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error updating distributor status',
      error: error.message
    });
  }
};

// @desc    Delete distributor application
// @route   DELETE /api/distributors/:id
// @access  Private
exports.deleteDistributor = async (req, res) => {
  try {
    let success = false;
    if (isDbConnected()) {
      const deleted = await Distributor.findByIdAndDelete(req.params.id);
      success = !!deleted;
    } else {
      success = jsonStore.deleteDistributor(req.params.id);
    }

    if (!success) {
      return res.status(404).json({
        success: false,
        message: `Distributor application with ID ${req.params.id} not found`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Distributor application deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error deleting distributor application',
      error: error.message
    });
  }
};
