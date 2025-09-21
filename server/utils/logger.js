const { Log } = require("../schemas/Schemas");

// Helper function to log events
async function logEvent(eventType, videoId, details = {}) {
  await new Log({ eventType, videoId, details }).save();
};

module.exports = { logEvent };