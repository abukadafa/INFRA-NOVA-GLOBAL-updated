const express = require('express');
const router = express.Router();
const { getProperties, getPropertyById } = require('../controllers/propertyController');

router.route('/')
  .get(getProperties);

router.route('/:id')
  .get(getPropertyById);

module.exports = router;
