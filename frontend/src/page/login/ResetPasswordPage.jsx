import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../style/passwd/ResetPasswordPage.css'; // Import CSS styles

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://celebritychatbot.up.railway.app/api/auth/reset-password/${token}`, { newPassword });
      setMessage('Đặt lại mật khẩu thành công! Bạn có thể đăng nhập lại.');
      setSuccess(true);
    } catch (err) {
      setMessage('Token không hợp lệ hoặc có lỗi xảy ra.');
      setSuccess(false);
    }
  };

  return (
    <div className="reset-container">
      <h2 className="reset-title">Đặt lại mật khẩu</h2>
      <form className="reset-form" onSubmit={handleSubmit}>
        <input
          className="reset-input"
          type="password"
          placeholder="Nhập mật khẩu mới"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />
        <button className="reset-btn" type="submit">Đặt lại mật khẩu</button>
      </form>
      {message && <p className={success ? 'reset-message success' : 'reset-message error'}>{message}</p>}
    </div>
  );
}