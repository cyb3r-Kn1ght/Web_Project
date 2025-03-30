import React from 'react';

const AlertDemo = () => {
  return (
    // Đây là một thông báo demo, hiển thị ở dưới cùng của chatbox.
    <div className="alert-demo" style={{ fontSize: '0.85rem', textAlign: 'center', marginTop: '0.5rem', color: '#555' }}>
      Đây là phiên bản thử nghiệm, các tính năng có thể không hoạt động như mong đợi.
    </div>
  );
};

export default AlertDemo;
