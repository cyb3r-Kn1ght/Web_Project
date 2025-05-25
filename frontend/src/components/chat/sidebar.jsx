import React, { useState } from 'react';
import BodySidebar from './bodysidebar';
import FooterSidebar from './footersidebar';
import '../../style/chat/sidebar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';


// component này đại diện cho sidebar, bao gồm header, nội dung và footer
const Sidebar = ({ celebs, selectedCeleb, handleSelect }) => {
  // State để lưu trạng thái thu gọn hoặc mở rộng sidebar
  const [collapsed, setCollapsed] = useState(false);
  // Hàm để thay đổi trạng thái thu gọn hoặc mở rộng sidebar
  const toggleSidebar = () => setCollapsed((collapsed));
  return (
    <div className={`sidebar-wrapper ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {/* Tiêu đề của sidebar */}
        <h2 className="sidebar-title">AI Chatbot</h2>
        {/* Button để thu gọn hoặc mở rộng sidebar */}
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={collapsed ? faBars : faEllipsisVertical} />
        </button>
      </div>
      {/* Nếu sidebar không bị thu gọn thì hiển thị nội dung bên trong */}
      {!collapsed && (
        <div className="sidebar-content">
          {/* Phần giữa của sidebar, bao gồm thanh tìm kiếm và danh sách các nhân vật nổi tiếng (celebs) */}
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
