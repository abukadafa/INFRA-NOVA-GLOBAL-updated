const Property = require('../models/Property');

// @desc    Get all properties with filtering and sorting
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res) => {
  try {
    const queryObj = {};

    // Filter by city
    if (req.query.city && req.query.city !== 'all') {
      // Direct match or partial match
      queryObj.city = { $regex: new RegExp(`^${req.query.city}$`, 'i') };
    }

    // Filter by type
    if (req.query.type && req.query.type !== 'all') {
      queryObj.type = req.query.type;
    }

    // Filter by status
    if (req.query.status && req.query.status !== 'all') {
      queryObj.status = req.query.status;
    }

    // Filter by price ranges
    if (req.query.priceRange && req.query.priceRange !== 'all') {
      const range = req.query.priceRange;
      if (range === 'under-50m') {
        queryObj.price = { $lt: 50000000 };
      } else if (range === '50m-250m') {
        queryObj.price = { $gte: 50000000, $lte: 250000000 };
      } else if (range === '250m-600m') {
        queryObj.price = { $gt: 250000000, $lte: 600000000 };
      } else if (range === 'above-600m') {
        queryObj.price = { $gt: 600000000 };
      }
    }

    // Keyword Search (matches title, location or description)
    if (req.query.search) {
      const term = req.query.search.trim();
      queryObj.$or = [
        { title: { $regex: term, $options: 'i' } },
        { location: { $regex: term, $options: 'i' } },
        { description: { $regex: term, $options: 'i' } }
      ];
    }

    // Initialize Mongoose Query
    let query = Property.find(queryObj);

    // Apply Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort;
      if (sortBy === 'price-asc') {
        query = query.sort({ price: 1 });
      } else if (sortBy === 'price-desc') {
        query = query.sort({ price: -1 });
      } else if (sortBy === 'area-desc') {
        query = query.sort({ area: -1 });
      } else {
        query = query.sort({ createdAt: -1 }); // Default to newest
      }
    } else {
      query = query.sort({ createdAt: -1 }); // Default fallback
    }

    const properties = await query;
    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error fetching properties',
      error: error.message
    });
  }
};

// @desc    Get single property by ID
// @route   GET /api/properties/:id
// @access  Public
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findOne({ id: req.params.id });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: `Property with ID "${req.params.id}" not found`
      });
    }

    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error fetching property with ID "${req.params.id}"`,
      error: error.message
    });
  }
};

// @desc    Create new property
// @route   POST /api/properties
// @access  Private/Admin
exports.createProperty = async (req, res) => {
  try {
    const propertyData = req.body;
    
    // Check if property id already exists
    if (!propertyData.id) {
      // Auto-generate id from title if not provided
      propertyData.id = propertyData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
    
    const existing = await Property.findOne({ id: propertyData.id });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Property with ID "${propertyData.id}" already exists. Try changing the title slightly.`
      });
    }
    
    const property = await Property.create(propertyData);
    
    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: property
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating property',
      error: error.message
    });
  }
};

// @desc    Update an existing property
// @route   PUT /api/properties/:id
// @access  Private/Admin
exports.updateProperty = async (req, res) => {
  try {
    let property = await Property.findOne({ id: req.params.id });
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: `Property with ID "${req.params.id}" not found`
      });
    }
    
    // Update fields
    property = await Property.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Property updated successfully',
      data: property
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating property',
      error: error.message
    });
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private/Admin
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findOne({ id: req.params.id });
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: `Property with ID "${req.params.id}" not found`
      });
    }
    
    await Property.deleteOne({ id: req.params.id });
    
    res.status(200).json({
      success: true,
      message: `Property with ID "${req.params.id}" deleted successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting property',
      error: error.message
    });
  }
};
