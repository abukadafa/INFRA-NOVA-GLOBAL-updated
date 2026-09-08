const mongoose = require('mongoose');
const Property = require('../models/Property');
const jsonStore = require('../config/jsonStore');

function isDbConnected() {
  return mongoose.connection && mongoose.connection.readyState === 1;
}

// @desc    Get all properties with filtering and sorting
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res) => {
  try {
    if (isDbConnected()) {
      const queryObj = {};

      if (req.query.city && req.query.city !== 'all') {
        queryObj.city = { $regex: new RegExp(`^${req.query.city}$`, 'i') };
      }
      if (req.query.type && req.query.type !== 'all') {
        queryObj.type = req.query.type;
      }
      if (req.query.status && req.query.status !== 'all') {
        queryObj.status = req.query.status;
      }
      if (req.query.priceRange && req.query.priceRange !== 'all') {
        const range = req.query.priceRange;
        if (range === 'under-50m') queryObj.price = { $lt: 50000000 };
        else if (range === '50m-250m') queryObj.price = { $gte: 50000000, $lte: 250000000 };
        else if (range === '250m-600m') queryObj.price = { $gt: 250000000, $lte: 600000000 };
        else if (range === 'above-600m') queryObj.price = { $gt: 600000000 };
      }
      if (req.query.search) {
        const term = req.query.search.trim();
        queryObj.$or = [
          { title: { $regex: term, $options: 'i' } },
          { location: { $regex: term, $options: 'i' } },
          { description: { $regex: term, $options: 'i' } }
        ];
      }

      let query = Property.find(queryObj);
      if (req.query.sort === 'price-asc') query = query.sort({ price: 1 });
      else if (req.query.sort === 'price-desc') query = query.sort({ price: -1 });
      else if (req.query.sort === 'area-desc') query = query.sort({ area: -1 });
      else query = query.sort({ createdAt: -1 });

      const properties = await query;
      return res.status(200).json({ success: true, count: properties.length, data: properties });
    }

    // Fallback: JSON File Store
    let properties = jsonStore.getAll();

    if (req.query.city && req.query.city !== 'all') {
      properties = properties.filter(p => p.city.toLowerCase() === req.query.city.toLowerCase());
    }
    if (req.query.type && req.query.type !== 'all') {
      properties = properties.filter(p => p.type === req.query.type);
    }
    if (req.query.status && req.query.status !== 'all') {
      properties = properties.filter(p => p.status === req.query.status);
    }
    if (req.query.search) {
      const term = req.query.search.toLowerCase();
      properties = properties.filter(p => 
        (p.title && p.title.toLowerCase().includes(term)) ||
        (p.location && p.location.toLowerCase().includes(term)) ||
        (p.description && p.description.toLowerCase().includes(term))
      );
    }

    if (req.query.sort === 'price-asc') properties.sort((a,b) => a.price - b.price);
    else if (req.query.sort === 'price-desc') properties.sort((a,b) => b.price - a.price);

    res.status(200).json({ success: true, count: properties.length, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching properties', error: error.message });
  }
};

// @desc    Get single property by ID
// @route   GET /api/properties/:id
// @access  Public
exports.getPropertyById = async (req, res) => {
  try {
    if (isDbConnected()) {
      const property = await Property.findOne({ id: req.params.id });
      if (!property) return res.status(404).json({ success: false, message: `Property not found` });
      return res.status(200).json({ success: true, data: property });
    }

    const property = jsonStore.getById(req.params.id);
    if (!property) return res.status(404).json({ success: false, message: `Property not found` });
    res.status(200).json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching property', error: error.message });
  }
};

// @desc    Create new property
// @route   POST /api/properties
// @access  Private/Admin
exports.createProperty = async (req, res) => {
  try {
    const propertyData = req.body;
    if (!propertyData.id) {
      propertyData.id = (propertyData.title || 'property')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    // Format price if priceFormatted not sent
    if (propertyData.price && !propertyData.priceFormatted) {
      propertyData.priceFormatted = '₦' + Number(propertyData.price).toLocaleString();
    }

    // Ensure array structures
    if (typeof propertyData.images === 'string') {
      propertyData.images = propertyData.images.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (typeof propertyData.amenities === 'string') {
      propertyData.amenities = propertyData.amenities.split(',').map(s => s.trim()).filter(Boolean);
    }

    if (isDbConnected()) {
      const existing = await Property.findOne({ id: propertyData.id });
      if (existing) return res.status(400).json({ success: false, message: `Property ID already exists` });
      const property = await Property.create(propertyData);
      return res.status(201).json({ success: true, message: 'Property created', data: property });
    }

    // JSON fallback storage
    const all = jsonStore.getAll();
    if (all.some(p => p.id === propertyData.id)) {
      propertyData.id = propertyData.id + '-' + Date.now();
    }
    propertyData.createdAt = new Date().toISOString();
    all.unshift(propertyData);
    jsonStore.saveAll(all);

    res.status(201).json({ success: true, message: 'Property created successfully', data: propertyData });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error creating property', error: error.message });
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private/Admin
exports.updateProperty = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.price && !updates.priceFormatted) {
      updates.priceFormatted = '₦' + Number(updates.price).toLocaleString();
    }
    if (typeof updates.images === 'string') {
      updates.images = updates.images.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (typeof updates.amenities === 'string') {
      updates.amenities = updates.amenities.split(',').map(s => s.trim()).filter(Boolean);
    }

    if (isDbConnected()) {
      const property = await Property.findOneAndUpdate(
        { id: req.params.id },
        updates,
        { new: true, runValidators: true }
      );
      if (!property) return res.status(404).json({ success: false, message: `Property not found` });
      return res.status(200).json({ success: true, message: 'Property updated', data: property });
    }

    const all = jsonStore.getAll();
    const idx = all.findIndex(p => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: `Property not found` });

    all[idx] = { ...all[idx], ...updates, updatedAt: new Date().toISOString() };
    jsonStore.saveAll(all);

    res.status(200).json({ success: true, message: 'Property updated successfully', data: all[idx] });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating property', error: error.message });
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private/Admin
exports.deleteProperty = async (req, res) => {
  try {
    if (isDbConnected()) {
      const property = await Property.findOne({ id: req.params.id });
      if (!property) return res.status(404).json({ success: false, message: `Property not found` });
      await Property.deleteOne({ id: req.params.id });
      return res.status(200).json({ success: true, message: `Property deleted` });
    }

    let all = jsonStore.getAll();
    const initialLen = all.length;
    all = all.filter(p => p.id !== req.params.id);
    if (all.length === initialLen) return res.status(404).json({ success: false, message: `Property not found` });

    jsonStore.saveAll(all);
    res.status(200).json({ success: true, message: `Property deleted successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting property', error: error.message });
  }
};
