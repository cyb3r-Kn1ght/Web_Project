import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const HeaderSidebar = ({ isCollapsed, onToggle }) => {
  return (
    <div className="sidebar-header">
      <h3 className="sidebar-title">AI Chatbot</h3>
      <button className="sidebar-toggle-btn" onClick={onToggle}>
        <FontAwesomeIcon icon={isCollapsed ? faEllipsisVertical : faBars} />
      </button>
    </div>
  );
};

export default HeaderSidebar;
