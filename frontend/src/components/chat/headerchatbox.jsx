import React from 'react';

const HeaderChatbox = ({ selectedCeleb }) => {
  return (
    <div className="chatbox-header">
      <img src={selectedCeleb.avatar} alt={selectedCeleb.name} className="chatbox-header-avatar" />
      <span className="chatbox-header-name">{selectedCeleb.name}</span>
    </div>
  );
};

export default HeaderChatbox;
