import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Quên mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Nhập email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">Gửi link đặt lại mật khẩu</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}