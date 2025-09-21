
const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
require('dotenv').config();
const { logEvent } = require('../utils/logger');


// YouTube API setup
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});


// API Routes
// Fetch video details
router.get('/video/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await youtube.videos.list({
      part: 'snippet,statistics',
      id: id
    });
    
    await logEvent('VIDEO_FETCHED', id);
    res.json(response.data.items[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update video title/description
router.put('/video/:id/update', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    
    const response = await youtube.videos.update({
      part: 'snippet',
      requestBody: {
        id: id,
        snippet: { title, description }
      }
    });
    
    await logEvent('VIDEO_UPDATED', id, { title, description });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post a new comment
router.post('/video/:id/comment', async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    
    const response = await youtube.commentThreads.insert({
      part: 'snippet',
      requestBody: {
        snippet: {
          videoId: id,
          topLevelComment: {
            snippet: { textOriginal: text }
          }
        }
      }
    });
    
    await logEvent('COMMENT_ADDED', id, { text });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reply to a comment
router.post('/video/:id/comment/:commentId/reply', async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const { text } = req.body;
    
    const response = await youtube.comments.insert({
      part: 'snippet',
      requestBody: {
        snippet: {
          parentId: commentId,
          textOriginal: text
        }
      }
    });
    
    await logEvent('COMMENT_REPLIED', id, { commentId, text });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a comment
router.delete('/video/:id/comment/:commentId/delete', async (req, res) => {
  try {
    const { id, commentId } = req.params;
    
    await youtube.comments.delete({ id: commentId });
    
    await logEvent('COMMENT_DELETED', id, { commentId });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;