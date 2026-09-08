const mongoose = require('mongoose');

const distributorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  businessType: {
    type: String,
    required: true,
    trim: true
  },
  volume: {
    type: String,
    required: true,
    trim: true
  },
  notes: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'approved', 'declined'],
    default: 'new'
  }
}, {
  timestamps: true
});

const Distributor = mongoose.model('Distributor', distributorSchema);

module.exports = Distributor;
