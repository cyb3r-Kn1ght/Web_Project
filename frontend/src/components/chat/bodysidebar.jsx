import { useState } from 'react';
import Celebs from './celebs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faGear } from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../assets/chat/default-avatar.png';
import '../../style/chat/sidebar.css';

// Component này dùng để hiển thị phần giữa của sidebar, bao gồm thanh tìm kiếm và danh sách các nhân vật nổi tiếng (celebs).
const BodySidebar = ({ celebs, useSelectedCeleb, handleSelect }) => {
  // State để lưu giá trị tìm kiếm
  const [search, setSearch] = useState('');
  // State để quản lý việc hiển thị menu cài đặt
  const [showMenu, setShowMenu] = useState(false);
  // Lấy thông tin người dùng đã đăng nhập và hàm đăng xuất từ store
  const { authUser, LogOut } = useAuthStore();
  // Sử dụng navigate từ react-router-dom để điều hướng trang
  const navigate = useNavigate();

  // Hàm xử lý đăng xuất
  const handleLogout = async () => {
    // Gọi hàm đăng xuất từ useAuthStore
    await LogOut();
    // Điều hướng đến trang đăng nhập
    navigate('/auth/login');
  }

  // State để lưu danh sách các nhân vật nổi tiếng (celebs) đã được lọc theo từ khóa tìm kiếm
  const filtered = celebs.filter((c) =>
    // search.toLowerCase() là từ khóa tìm kiếm, c.celebName là tên của nhân vật nổi tiếng
    // Kiểm tra xem tên nhân vật có chứa từ khóa tìm kiếm hay không (không phân biệt chữ hoa chữ thường)
    c.celebName.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div className="sidebar-body">
        <div className="search-bar">
          {/*Thanh tìm kiếm*/}
          {/* Biểu tượng tìm kiếm */}
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <input
            /* Input tìm kiếm */
            className="search-input"
            type="text"
            placeholder="Tìm kiếm nhân vật"
            value={search}
            // Cập nhật giá trị tìm kiếm khi người dùng nhập vào ô input
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/*Danh sách các nhân vật nổi tiếng (celebs) đã được lọc theo từ khóa tìm kiếm*/}
        <Celebs
          // Truyền danh sách celebs đã được lọc
          // useSelectedCeleb là hook để quản lý nhân vật được chọn
          // handleSelect là hàm để xử lý việc chọn nhân vật
          celebs={filtered}
          useSelectedCeleb={useSelectedCeleb}
          handleSelect={handleSelect}
        />
      </div>
      {/* Phần menu cài đặt, có 2 button là Nâng cấp gói và đăng xuất */}
      <div className="sidebar-settings">
        {/* Nút cài đặt, khi nhấn vào nút này sẽ hiển thị menu */}
        <button className="settings-button" onClick={() => setShowMenu(!showMenu)}>
          <FontAwesomeIcon icon={faGear} />
          <span>Cài đặt</span>
        </button>

        {showMenu && (
          // Hiển thị menu cài đặt nếu showMenu là true
          // Phần này sẽ hiển thị thông tin người dùng và các tùy chọn cài đặt
          <div className="settings-dropdown">
            {/* Hiển thị thông tin người dùng */}
            <div className="account-info">
              <img
                // Hiển thị ảnh đại diện của người dùng, nếu không có thì sử dụng ảnh mặc định
                src={authUser?.profilePic || defaultAvatar}
                alt="avatar"
                className="avatar"
              />
              <div className="info-text">
                {/* Hiển thị tên người dùng và trạng thái gói */}
                <p className="name">{authUser?.username}</p>
                <p className="tier">Trạng thái: <span>{authUser?.tier}</span></p>
              </div>
            </div>
            {/* Các tùy chọn cài đặt */}
            {/* Nếu người dùng không phải premium, hiển thị button nâng cấp gói */}
            {authUser?.tier !== 'premium' && (
              // Nút nâng cấp gói, khi nhấn vào sẽ điều hướng đến trang thanh toán
              <button className="settings-option" onClick={() => navigate('/payment')}>
                Nâng cấp gói
              </button>
            )}
            {/* Nút đăng xuất, khi nhấn vào sẽ gọi hàm handleLogout */}
            <button className="settings-option" onClick={handleLogout}>Đăng xuất</button>
          </div>
        )}
      </div>
    </>
  );
};

export default BodySidebar;
