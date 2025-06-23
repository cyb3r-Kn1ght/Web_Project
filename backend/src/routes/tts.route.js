import express from 'express';
import axios   from 'axios';

const router = express.Router();

/**
 * POST /api/tts
 * Forward văn bản tới TTS service (đã public qua ngrok) và trả lại WAV.
 *
 * Body JSON:
 *   text     (string, bắt buộc)
 *   persona  (string, tuỳ chọn – "my_tam" | "son_tung" | "tran_thanh")
 *   speed    (float,  tuỳ chọn, mặc định 1.0)
 */
router.post('/', async (req, res) => {
  const {
    text,
    persona = null,
    speed = 1.0,
  } = req.body;

  if (!text?.trim()) {
    return res.status(400).json({ error: 'Text is required' });
  }
  try {
    // Public ngrok URL, set trong .env → TTS_PUBLIC_URL=https://abcd1234.ngrok-free.app/tts
    const ttsUrl = process.env.TTS_PUBLIC_URL || 'https://21f6-2a09-bac5-d46f-e6-00-17-214.ngrok-free.app/tts';

    const { data } = await axios.post(ttsUrl, { text, persona, speed }, {
      responseType: 'arraybuffer',
      timeout: 60000,
    });

    res.setHeader('Content-Type', 'audio/wav');
    res.send(Buffer.from(data));
  } catch (err) {
    console.error('TTS proxy error:', err.response?.data || err.message);
    res.status(502).json({ error: 'Remote TTS failed' });
  }
});

export default router;