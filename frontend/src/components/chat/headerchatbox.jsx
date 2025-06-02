// component này đại diện cho header của chatbox, bao gồm ảnh đại diện và tên của người nổi tiếng được chọn
const HeaderChatbox = ({ selectedCeleb }) => {
  return (
    <div className="chatbox-header">
      {/* Nếu có nhân vật nổi tiếng được chọn thì hiển thị ảnh đại diện và tên, ngược lại hiển thị thông báo chào mừng */}
      {selectedCeleb ? (
        <>
          <img
            // Hiển thị ảnh đại diện của nhân vật nổi tiếng
            src={selectedCeleb.profilePic}
            alt={selectedCeleb.name}
            className="chatbox-avatar"
          />
          {/* Hiển thị tên của nhân vật nổi tiếng */}
          <span className="chatbox-name">{selectedCeleb.celebName}</span>
        </>
      ) : (
        // Nếu không có nhân vật nổi tiếng được chọn, hiển thị thông báo chào mừng
        <span className="placeholder-text">Chào mừng bạn!</span>
      )}
    </div>
  );
};

export default HeaderChatbox;
