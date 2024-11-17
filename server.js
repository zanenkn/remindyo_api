const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 1337;

require('dotenv').config();

app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

const BirthdaySchema = new mongoose.Schema({
  name: String,
  date: String,
});

const Birthday = mongoose.model('Birthday', BirthdaySchema);

app.post('/api/birthdays', async (req, res) => {
  try {
    const newBirthday = new Birthday(req.body);
    await newBirthday.save();
    res.status(201).json(newBirthday);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/birthdays', async (req, res) => {
  try {
    const birthdays = await Birthday.find();
    res.status(200).json(birthdays);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
