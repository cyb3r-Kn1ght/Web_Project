// backend/routes/tts.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  const text = req.body.text;

  try {
    const response = await axios.post(
      'https://api.fpt.ai/hmi/tts/v5',
      text, // đây là plain text
      {
        headers: {
          'api-key': '5xUbgeGDGvyPITGbcKO3J5ZYPdbDwtKJ',
          'speed': '1',  // tùy chỉnh -3 đến 3 nếu cần
          'voice': 'leminh', // đổi sang 'lannhi', 'leminh'...
          'Content-Type': 'text/plain'
        }
      }
    );

    res.json({ audioUrl: response.data.async });
  } catch (error) {
    console.error('TTS Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'TTS failed' });
  }
});

export const fetchTTSAudio = async (text) => {
  try {
    const res = await axios.post('celebritychatbot.up.railway.app/api/tts', { text });
    return res.data.audioUrl; // Đây là link .mp3 từ FPT
  } catch (err) {
    console.error('TTS error:', err);
    return null;
  }
};

module.exports = router;
