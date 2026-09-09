const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/infranova';
    const conn = await mongoose.connect(connStr, { serverSelectionTimeoutMS: 2000 });
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`MongoDB Notice: ${error.message}. Backend will use local JSON data store fallback.`);
  }
};

module.exports = connectDB;
