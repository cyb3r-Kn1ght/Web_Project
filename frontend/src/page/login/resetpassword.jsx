import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://celebritychatbot.up.railway.app/api/auth/reset-password/${token}`, { newPassword });
      setMessage('Đặt lại mật khẩu thành công! Bạn có thể đăng nhập lại.');
    } catch (err) {
      setMessage('Token không hợp lệ hoặc có lỗi xảy ra.');
    }
  };

  return (
    <div>
      <h2>Đặt lại mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nhập mật khẩu mới"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Đặt lại mật khẩu</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}