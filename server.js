const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const Birthday = require('./models/Birthday');
const authRoutes = require('./routes/auth');
const protect = require('./middleware/protect');

const app = express();
const PORT = process.env.PORT || 1337;

require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

connectDB();

app.use('/api/auth', authRoutes);

app.post('/api/birthdays', protect, async (req, res) => {
  try {
    const newBirthday = new Birthday({
      ...req.body,
      user: req.user,
    });
    await newBirthday.save();
    res.status(201).json(newBirthday);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/birthdays', protect, async (req, res) => {
  try {
    const birthdays = await Birthday.find({ user: req.user });
    res.status(200).json(birthdays);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
