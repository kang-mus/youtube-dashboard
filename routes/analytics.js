const express = require('express');
const { google } = require('googleapis');
const Channel = require('../models/Channel');
const auth = require('../middleware/auth');

const router = express.Router();

const youtube = google.youtube({
  version: 'v3',
  auth: 'YOUR_API_KEY' // Ganti dengan API Key kamu
});

router.get('/', auth, async (req, res) => {
  try {
    const channels = await Channel.findAll({ where: { userId: req.user.id } });

    const analyticsData = await Promise.all(channels.map(async (channel) => {
      const response = await youtube.channels.list({
        id: channel.channelId,
        part: 'statistics'
      });
      return response.data.items[0].statistics;
    }));

    res.json({ analyticsData });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

module.exports = router;
