import React from 'react';
import '../../style/payment/payment.css';

function Payment() {
  return (
    <div className="payment-container">
      <div className="payment-card">
        <h1 className="payment-title">Celebrity Pro</h1>
        <p className="payment-subtitle">
          Trò chuyện không giới hạn cùng người nổi tiếng yêu thích của bạn
        </p>

        <div className="payment-price">
          <span className="old-price">500.000 ₫</span>
          <span className="new-price">250.000 ₫/tháng</span>
        </div>

        <button className="payment-button">Đăng ký Celebrity Pro</button>

        <ul className="feature-list">
          <li>
            <strong>Nhắn tin không giới hạn</strong>
            <p>Nhắn tin cùng người nổi tiếng yêu thích của bạn mà không bị giới hạn số lượng tin nhắn</p>
          </li>
          <li>
            <strong>Text to speech</strong>
            <p>Không chỉ dừng lại ở nhắn tin, bạn có thể nghe những phản hồi từ người nổi tiếng</p>
          </li>
          <li>
            <strong>Mua một lần</strong>
            <p>Chỉ cần mua gói một lần, bạn có thể tận hưởng toàn bộ tính năng vĩnh viễn</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Payment;