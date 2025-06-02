import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

// component này đại diện cho header của sidebar, bao gồm tiêu đề và nút thu gọn/ mở rộng sidebar
const HeaderSidebar = ({ isCollapsed, onToggle }) => {
  return (
    <div className="sidebar-header">
      {/* Tiêu đề của sidebar */}
      <h3 className="sidebar-title">AI Chatbot</h3>
      {/* Button để thu gọn hoặc mở rộng sidebar */}
      <button className="sidebar-toggle-btn" onClick={onToggle}>
        {/* Hiển thị button tương ứng với trạng thái của sidebar (đang thu gọn hoặc mở rộng) */}
        <FontAwesomeIcon icon={isCollapsed ? faEllipsisVertical : faBars} />
      </button>
    </div>
  );
};

export default HeaderSidebar;
