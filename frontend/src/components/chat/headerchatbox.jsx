import React from 'react';

// component này đại diện cho header của chatbox, bao gồm ảnh đại diện và tên của người nổi tiếng được chọn
const HeaderChatbox = ({ selectedCeleb }) => {
  return (
    <div className="chatbox-header">
      {selectedCeleb ? (
        <>
          <img
            src={selectedCeleb.avatar}
            alt={selectedCeleb.name}
            className="chatbox-avatar"
          />
          <span className="chatbox-name">{selectedCeleb.name}</span>
        </>
      ) : (
        <span className="placeholder-text">Chào mừng!</span>
      )}
    </div>
  );
};

export default HeaderChatbox;
