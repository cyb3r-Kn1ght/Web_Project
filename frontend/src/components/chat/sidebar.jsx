import React, { useState } from 'react';
import BodySidebar from './bodysidebar';
import FooterSidebar from './footersidebar';
import '../../style/chat/sidebar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';


// component này đại diện cho sidebar, bao gồm header, nội dung và footer
const Sidebar = ({ celebs, selectedCeleb, handleSelect, isCollapsed, toggleSidebar}) => {
  // State để lưu trạng thái thu gọn hoặc mở rộng sidebar
  const [collapsed, setCollapsed] = useState(false);
  // Hàm để thay đổi trạng thái thu gọn hoặc mở rộng sidebar
  const toggleSidebar = () => setCollapsed(!collapsed);
  return (
    <div className={`sidebar-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {/* Tiêu đề của sidebar */}
        <h2 className="sidebar-title">AI Chatbot</h2>
        {/* Button giờ sẽ gọi hàm toggleSidebar từ props của cha */}
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          {/* Thay đổi icon dựa trên prop isCollapsed */}
          <FontAwesomeIcon icon={isCollapsed ? faBars : faEllipsisVertical} />
        </button>
      </div>
      {/* Nếu sidebar không bị thu gọn thì hiển thị nội dung bên trong */}
      {!isCollapsed && (
        <div className="sidebar-content">
          {/* Phần giữa của sidebar */}
          <BodySidebar
            celebs={celebs}
            selectedCeleb={selectedCeleb}
            handleSelect={handleSelect}
          />
          {/* Phần dưới của sidebar */}
          <FooterSidebar />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
