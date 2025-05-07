// File: src/lib/openai.js
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

/**
 * Gửi request tới OpenAI và trả về nội dung phản hồi
 * @param {string} userMessage
 * @param {Array<{role:string,content:string}>} [history=[]]
 * @returns {Promise<string>}
 */
export async function getAIResponse(userMessage, history = []) {
  try {
    const messages = history.map(msg => ({ role: msg.role, content: msg.content }));
    messages.push({ role: 'user', content: userMessage });

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      { model: 'gpt-3.5-turbo', messages },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    const aiContent = response.data.choices[0].message.content;
    return aiContent;
  } catch (error) {
    console.error('Error calling OpenAI:', error.response?.data || error.message);
    return 'Xin lỗi, có lỗi khi kết nối đến AI.';
  }
}