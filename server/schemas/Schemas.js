const { default: mongoose } = require("mongoose");

// Database schemas
const noteSchema = new mongoose.Schema({
  videoId: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});

const logSchema = new mongoose.Schema({
  eventType: String,
  timestamp: { type: Date, default: Date.now },
  videoId: String,
  details: Object
});

const Note = mongoose.model('Note', noteSchema);
const Log = mongoose.model('Log', logSchema);

module.exports = { Note, Log };