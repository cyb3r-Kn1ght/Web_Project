import express from 'express';
import axios from 'axios';

const router = express.Router();

/**
 * POST /api/tts
 * Forward văn bản tới proxy StyleTTS-2 và trả lại WAV cho frontend.
 *
 * Body JSON:
 *   text              (string, bắt buộc)
 *   speed             (float, tuỳ chọn, mặc định 1.0)
 *   reference_audio   (string URL hoặc đường dẫn local, tuỳ chọn)
 *   denoise           (float, tuỳ chọn, mặc định 0.6)
 *   avg_style         (bool,  tuỳ chọn, mặc định true)
 *   stabilize         (bool,  tuỳ chọn, mặc định true)
 */
router.post('/', async (req, res) => {
  const {
    text,
    speed = 1.0,
    reference_audio = null,
    denoise = 0.6,
    avg_style = true,
    stabilize = true
  } = req.body;

  if (!text?.trim()) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    // URL proxy, có thể đặt trong .env: STYLETTS2_PROXY_URL=http://host:8000/tts
    const proxyUrl = process.env.STYLETTS2_PROXY_URL || 'http://localhost:8000/tts';

    const proxyResp = await axios.post(
      proxyUrl,
      { text, speed, reference_audio, denoise, avg_style, stabilize },
      { responseType: 'arraybuffer', timeout: 60000 }        // nhận WAV thô
    );

    res.setHeader('Content-Type', 'audio/wav');
    res.send(Buffer.from(proxyResp.data));
  } catch (err) {
    console.error('StyleTTS2 Error:', err.response?.data || err.message);
    res.status(502).json({ error: 'TTS proxy failed' });
  }
});

export default router;
