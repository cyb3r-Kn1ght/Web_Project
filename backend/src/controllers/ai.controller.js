// controllers/ai.controller.js
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const getAIResponse = async (userMessage) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "Bạn là elon musk" 
        },
        { role: "user", content: userMessage }
      ]
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      }
    });
    console.log(response.data.choices[0].message.content);
  } catch (error) {
    console.error("Error calling OpenAI:", error.response ? error.response.data : error.message);
    return "lỗi kết nối";
  }
};
