const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load env variables
dotenv.config();

const Property = require('../models/Property');
const Booking = require('../models/Booking');

// Load mock properties directly from shared frontend file
const propertiesData = require('../../../frontend/public/js/properties-data');

const seedData = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/infranova';
    await mongoose.connect(connStr);
    console.log('MongoDB Connected for seeding...');

    // Delete existing properties
    await Property.deleteMany();
    console.log('Cleared existing properties from database.');

    // Optional: Clear bookings in development seeding if needed
    // await Booking.deleteMany();
    // console.log('Cleared bookings.');

    // Insert new properties
    await Property.insertMany(propertiesData);
    console.log(`Successfully seeded ${propertiesData.length} properties into database.`);

    mongoose.connection.close();
    console.log('Database connection closed. Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
