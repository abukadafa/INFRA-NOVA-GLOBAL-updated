const jwt = require('jsonwebtoken');

// @desc    Admin Login
// @route   POST /api/admin/login
// @access  Public
exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const envUsername = process.env.ADMIN_USERNAME || 'admin';
    const envPassword = process.env.ADMIN_PASSWORD || 'infranova2026';

    if (username !== envUsername || password !== envPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Admin username or password'
      });
    }

    const secret = process.env.JWT_SECRET || 'infranovaglobalconceptsecretkey2026';
    const token = jwt.sign(
      { username, role: 'admin' },
      secret,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error during admin login',
      error: error.message
    });
  }
};

// @desc    Verify current token validity
// @route   GET /api/admin/verify
// @access  Private (auth middleware verified)
exports.verifyAdminToken = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Admin token is valid',
    admin: req.admin
  });
};
