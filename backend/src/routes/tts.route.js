import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/', async (req, res) => {
  const text = req.body.text;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  try {
    // Gọi FPT AI để lấy URL audio
    const response = await axios.post(
      'https://api.fpt.ai/hmi/tts/v5',
      text,
      {
        headers: {
          'api-key': process.env.FPT_AI_API_KEY, // Đặt key trong .env
          'speed': '1',
          'voice': 'leminh',
          'Content-Type': 'text/plain'
        }
      }
    );
    const audioUrl = response.data.async;

    // Đợi file audio sẵn sàng (FPT AI cần 1-2s)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Backend tải file audio về
    const audioResponse = await axios.get(audioUrl, { responseType: 'arraybuffer' });

    // Trả về file audio cho frontend
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(audioResponse.data));
  } catch (error) {
    console.error('TTS Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'TTS failed' });
  }
});

export default router;
