import React from 'react';
import '../../style/payment/payment.css';
import { axiosInstance } from '../../lib/axios.js';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';



function Payment() {
  const navigate = useNavigate();
  const handlePayment = async () => {
    try {
      const res = await axiosInstance.post("/api/vnpay/create-payment");

      if (res?.data) {
        console.log(res.data.paymentUrl);
        window.location.href = res.data.paymentUrl;
      } else {
        toast.error("Invalid payment URL received");
      }
    
    } catch (err) {
      toast.error("Error in payment");
      console.log("Error in payment: ", err);
      navigate("/chat");
    }
  };

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

        <button className="payment-button" onClick={handlePayment}>Đăng ký Celebrity Pro</button>

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