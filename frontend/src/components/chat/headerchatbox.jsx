import React from 'react';

// component này đại diện cho header của chatbox, bao gồm ảnh đại diện và tên của người nổi tiếng được chọn
const HeaderChatbox = ({ selectedCeleb }) => {
  return (
    <div className="chatbox-header">
      {/* hiển thị ảnh đại diện của người nổi tiếng được chọn và tên của họ */}
      <img src={selectedCeleb.avatar} alt={selectedCeleb.name} className="chatbox-header-avatar" />
      <span className="chatbox-header-name">{selectedCeleb.name}</span>
    </div>
  );
};

export default HeaderChatbox;
