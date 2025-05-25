import React from 'react';

// component này đại diện cho header của chatbox, bao gồm ảnh đại diện và tên của người nổi tiếng được chọn
const HeaderChatbox = ({ selectedCeleb }) => {
  return (
    <div className="chatbox-header">
      {selectedCeleb ? (
        <>
          <img
            src={selectedCeleb.profilePic}
            alt={selectedCeleb.name}
            className="chatbox-avatar"
          />
          <span className="chatbox-name">{selectedCeleb.celebName}</span>
        </>
      ) : (
        <span className="placeholder-text">Chào mừng bạn!</span>
      )}
    </div>
  );
};

export default HeaderChatbox;
