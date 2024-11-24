const mongoose = require('mongoose');

const BirthdaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model('Birthday', BirthdaySchema);
