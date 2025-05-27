// services/ttsService.js
import axios from "axios";

export const fetchTTSAudio = async (text) => {
  const url = "https://api.fpt.ai/hmi/tts/v5";
  const apiKey = "paUquwb3Ud9IZyJZPy0xOAOe9oZGyMLC";

  try {
    const response = await axios.post(url, text, {
      headers: {
        "api-key": apiKey,
        "speed": "",
        "voice": "leminh",
        "Content-Type": "text/plain"
      },
      responseType: "json"
    });

    return response.data.async; // Link đến file âm thanh
  } catch (error) {
    console.error("TTS error:", error.response?.data || error.message);
    throw error;
  }
};
