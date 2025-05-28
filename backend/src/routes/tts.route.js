// backend/routes/tts.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/tts', async (req, res) => {
  const text = req.body.text;
  
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    // Gọi FPT AI API để lấy URL audio
    const response = await axios.post(
      'https://api.fpt.ai/hmi/tts/v5',
      text,
      {
        headers: {
          'api-key': process.env.FPT_AI_API_KEY,
          'speed': '1',
          'voice': 'leminh',
          'Content-Type': 'text/plain'
        }
      }
    );

    // Trả về URL audio
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

export default router;
