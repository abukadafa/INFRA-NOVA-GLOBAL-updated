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
