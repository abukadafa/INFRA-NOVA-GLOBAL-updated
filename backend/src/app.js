const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const propertyRoutes = require('./routes/propertyRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Load Middleware
app.use(cors()); // Allows any origin by default for local dev
app.use(express.json()); // Parses application/json

// Log requests in development
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Mount Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingRoutes);

// Base Route / Health Check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Infranova Global API portal. Health check: OK.'
  });
});

// Catch-all 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} not found on this server`
  });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`App Error: ${err.stack}`);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;
