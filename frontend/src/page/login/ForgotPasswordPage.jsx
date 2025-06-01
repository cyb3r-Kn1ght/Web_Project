import React, { useState } from 'react';
import axios from 'axios';
import '../../style/passwd/ForgotPasswordPage.css'; // Import CSS styles

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://celebritychatbot.up.railway.app/api/auth/forgot-password', { email });
      setMessage('Vui lòng kiểm tra email để nhận link đặt lại mật khẩu.');
    } catch (err) {
      setMessage('Email không tồn tại hoặc có lỗi xảy ra.');
    }
  };

  return (
    <div className="forgot-container">
      <h2 className="forgot-title">Quên mật khẩu?</h2>
      <form className="forgot-form" onSubmit={handleSubmit}>
        <input
          className="forgot-input"
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button className="forgot-btn" type="submit">Tiếp tục</button>
      </form>
      {message && <p className="forgot-message">{message}</p>}
    </div>
  );
}