const mongoose = require('mongoose');

// The Schema is the blueprint
const BookmarkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// The Model is the tool we use to actually talk to the database
module.exports = mongoose.model('Bookmark', BookmarkSchema);