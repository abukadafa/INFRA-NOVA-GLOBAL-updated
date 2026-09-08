const express = require('express');
const router = express.Router();
const { getProperties, getPropertyById, createProperty, updateProperty, deleteProperty } = require('../controllers/propertyController');
const auth = require('../middleware/auth');

router.route('/')
  .get(getProperties)
  .post(auth, createProperty);

router.route('/:id')
  .get(getPropertyById)
  .put(auth, updateProperty)
  .delete(auth, deleteProperty);

module.exports = router;
