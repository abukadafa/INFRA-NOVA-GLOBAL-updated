const express = require('express');
const router = express.Router();
const {
  createDistributor,
  getDistributors,
  updateDistributorStatus,
  deleteDistributor
} = require('../controllers/distributorController');
const auth = require('../middleware/auth');

router.route('/')
  .post(createDistributor)
  .get(auth, getDistributors);

router.route('/:id/status')
  .put(auth, updateDistributorStatus);

router.route('/:id')
  .delete(auth, deleteDistributor);

module.exports = router;
