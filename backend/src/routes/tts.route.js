// backend/routes/tts.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/', async (req, res) => {
  const text = req.body.text;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  try {
    // Bước 1: Lấy URL audio từ FPT
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
    const audioUrl = response.data.async;

    // Bước 2: Đợi file audio sẵn sàng (FPT AI cần 1-2s)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Bước 3: Backend tải file audio về
    const audioResponse = await axios.get(audioUrl, { responseType: 'arraybuffer' });

    // Trả về file audio cho frontend
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(audioResponse.data));
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
