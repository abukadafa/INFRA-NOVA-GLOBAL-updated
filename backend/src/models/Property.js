const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['residential', 'commercial', 'land']
  },
  status: {
    type: String,
    required: true,
    enum: ['for-sale', 'for-rent', 'coming-soon', 'featured']
  },
  price: {
    type: Number,
    required: true
  },
  priceFormatted: {
    type: String,
    required: true
  },
  beds: {
    type: Number,
    default: null
  },
  baths: {
    type: Number,
    default: null
  },
  area: {
    type: Number,
    required: true
  },
  images: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    required: true
  },
  amenities: {
    type: [String],
    default: []
  },
  specs: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
