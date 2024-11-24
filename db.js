const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
