// Component để hiển thị danh sách các nhân vật nổi tiếng (celebs) trong sidebar của chatbox.
// Các props nhận vào bao gồm: celebs (danh sách các nhân vật nổi tiếng), selectedCeleb (nhân vật được chọn), và handleSelect (hàm xử lý sự kiện khi chọn một nhân vật).
const Celebs = ({ celebs, selectedCeleb, handleSelect }) => {
  return (
    <div className="celebs">
      {/* Map các nhân vật nổi tiếng (celebs) và hiển thị chúng */}
      {celebs.map((celeb) => (
        <div
          // Sử dụng _id của celeb làm key để React có thể theo dõi các phần tử trong danh sách
          key={celeb._id}
          // Nếu celeb được chọn thì thêm class 'selected' để xác định trạng thái được chọn
          className={`celebs-item ${selectedCeleb?._id === celeb._id ? 'selected' : ''}`}
          // Khi nhấn vào celeb, gọi hàm handleSelect để xử lý sự kiện chọn celeb
          onClick={() => handleSelect(celeb)}
        >
          {/*Hiển thị ảnh đại diện và tên của celeb*/}
          <img src={celeb.profilePic} alt={celeb.celebName} className="celebs-avatar" />
          {/*Tên của celeb, hiển thị bên cạnh ảnh đại diện*/}
          <span className="celebs-name">{celeb.celebName}</span>
        </div>
      ))}
    </div>
  );
};

export default Celebs;
