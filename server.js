const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const Birthday = require('./models/Birthday');

const app = express();
const PORT = process.env.PORT || 1337;

require('dotenv').config();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

connectDB();

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
