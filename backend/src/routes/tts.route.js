// backend/routes/tts.js
import express from 'express';
import axios from 'axios';
import { Readable } from 'stream';

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

    const audioUrl = response.data.async;
    
    // Đợi file audio được tạo (thường mất 1-2 giây)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Tải file audio từ FPT
    const audioResponse = await axios.get(audioUrl, {
      responseType: 'arraybuffer'
    });

    // Set headers cho audio stream
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', audioResponse.data.length);
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

    // Stream audio data
    const stream = Readable.from(audioResponse.data);
    stream.pipe(res);

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
