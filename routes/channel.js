const express = require('express');
const { google } = require('googleapis');
const Channel = require('../models/Channel');
const auth = require('../middleware/auth');

const router = express.Router();

const youtube = google.youtube({
  version: 'v3',
  auth: 'YOUR_API_KEY' // Ganti dengan API Key kamu
});

// Rute untuk mendapatkan semua channel
router.get('/', auth, async (req, res) => {
  try {
    // Ambil ID pengguna dari token yang sudah terautentikasi
    const userId = req.user.id;

    // Ambil channel dari database berdasarkan userId
    const channels = await Channel.findAll({
      where: { userId: userId }
    });

    res.json(channels);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch channels' });
  }
});

router.post('/add', auth, async (req, res) => {
  const { channelId } = req.body;

  try {
    const channel = await Channel.create({ userId: req.user.id, channelId });
    res.json({ message: 'Channel added', channel });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add channel' });
  }
});

module.exports = router;
