const express = require('express');
const router = express.Router();
const { Log } = require('../schemas/Schemas');


// Fetch logs
router.get('/logs', async (req, res) => {
  try {
    const { videoId } = req.query;
    const logs = await Log.find(videoId ? { videoId } : {}).sort({ timestamp: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;