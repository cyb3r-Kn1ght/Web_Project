import React, { useState } from 'react';
import BodySidebar from './bodysidebar';
import FooterSidebar from './footersidebar';
import '../../style/chat/sidebar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';


// component này đại diện cho sidebar, bao gồm header, nội dung và footer
const Sidebar = ({ celebs, selectedCeleb, handleSelect }) => {
  // State để lưu trạng thái thu gọn hoặc mở rộng sidebar
  const [collapsed, setCollapsed] = useState(
    () => window.matchMedia('(max-width: 768px)').matches
  );
  useEffect(() => {
    // Tạo một đối tượng media query
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    // Hàm listener để cập nhật state 'collapsed' khi có sự thay đổi
    const handleResize = () => {
      setCollapsed(mediaQuery.matches);
    };

    // Thêm listener vào media query
    mediaQuery.addEventListener('change', handleResize);

    // Dọn dẹp listener khi component bị unmount (rất quan trọng để tránh rò rỉ bộ nhớ)
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []); // Mảng rỗng [] đảm bảo effect này chỉ chạy 1 lần khi component mount

  // Hàm để thay đổi trạng thái thu gọn hoặc mở rộng sidebar
  const toggleSidebar = () => setCollapsed(!collapsed);
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
