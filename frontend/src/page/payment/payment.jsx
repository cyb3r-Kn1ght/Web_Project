import React from 'react';
import '../../style/payment/payment.css';

function Payment() {
  return (
    <div className="payment-container">
      <div className="payment-card">
        <h1 className="payment-title">Google AI Pro</h1>
        <p className="payment-subtitle">
          Khai thác thêm các tính năng mới và mạnh mẽ để tăng năng suất và khả năng sáng tạo
        </p>

        <div className="payment-price">
          <span className="old-price">489.000 ₫</span>
          <span className="new-price">0 ₫/tháng</span>
        </div>

        <button className="payment-button">Đăng ký Google AI Pro</button>

        <ul className="feature-list">
          <li>
            <strong>Ứng dụng Gemini</strong>
            <p>Khai thác thêm mô hình 2.5 mạnh nhất của Google, Deep Research trên 2.5 Pro và tính năng tạo video bằng Veo 2</p>
          </li>
          <li>
            <strong>NotebookLM</strong>
            <p>Trợ lý nghiên cứu và viết lách với số lượng bản tóm tắt bằng âm thanh và số ghi chú nhiều hơn gấp 5 lần, cùng nhiều lợi ích khác</p>
          </li>
          <li>
            <strong>Gemini trong Gmail, Tài liệu, Vids</strong>
            <p>Quyền truy cập vào Gemini ngay trong các ứng dụng của Google</p>
          </li>
          <li>
            <strong>Bộ nhớ</strong>
            <p>Tổng bộ nhớ 2 TB cho Photos, Drive và Gmail</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Payment;