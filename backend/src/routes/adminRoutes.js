const express = require('express');
const router = express.Router();
const { adminLogin, verifyAdminToken } = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/login', adminLogin);
router.get('/verify', auth, verifyAdminToken);

module.exports = router;
