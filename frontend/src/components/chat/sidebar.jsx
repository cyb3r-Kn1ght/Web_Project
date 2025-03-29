import React, { useState } from 'react';
import HeaderSidebar from './headersidebar';
import BodySidebar from './bodysidebar';
import FooterSidebar from './footersidebar';
import '../../style/chat/sidebar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ celebs, selectedCeleb, handleSelect }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className={`sidebar-wrapper ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">AI Chatbot</h2>
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={collapsed ? faBars : faEllipsisVertical} />
        </button>
      </div>

      {!collapsed && (
        <div className="sidebar-content">
          <BodySidebar
            celebs={celebs}
            selectedCeleb={selectedCeleb}
            handleSelect={handleSelect}
          />
          <FooterSidebar />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
