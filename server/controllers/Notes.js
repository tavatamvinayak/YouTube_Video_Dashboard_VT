
const express = require('express');
const router = express.Router();
const { logEvent } = require('../utils/logger');
const { Note } = require('../schemas/Schemas');



// Notes CRUD
router.get('/notes', async (req, res) => {
  try {
    const { videoId } = req.query;
    const notes = await Note.find(videoId ? { videoId } : {});
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/notes', async (req, res) => {
  try {
    const { videoId, content } = req.body;
    const note = new Note({ videoId, content });
    await note.save();
    
    await logEvent('NOTE_ADDED', videoId, { content });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const note = await Note.findByIdAndUpdate(id, { content }, { new: true });
    
    await logEvent('NOTE_UPDATED', note.videoId, { content });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);
    
    await logEvent('NOTE_DELETED', note.videoId, { noteId: id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;