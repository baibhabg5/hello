require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Bookmark = require('./models/Bookmark'); // Import the blueprint

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.log("Connection Error: ", err));

// --- ROUTES ---

// 1. GET all bookmarks
app.get('/api/bookmarks', async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. POST a new bookmark
app.post('/api/bookmarks', async (req, res) => {
  const bookmark = new Bookmark({
    title: req.body.title,
    url: req.body.url
  });
  try {
    const newBookmark = await bookmark.save();
    res.status(201).json(newBookmark);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. DELETE a bookmark (The missing piece!)
app.delete('/api/bookmarks/:id', async (req, res) => {
  try {
    const id = req.params.id; // Get the ID from the URL
    await Bookmark.findByIdAndDelete(id);
    res.json({ message: "Bookmark deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});