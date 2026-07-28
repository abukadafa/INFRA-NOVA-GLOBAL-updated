const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No admin token provided.'
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token
    const secret = process.env.JWT_SECRET || 'infranovaglobalconceptsecretkey2026';
    const decoded = jwt.verify(token, secret);
    
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired admin session token.',
      error: error.message
    });
  }
};
