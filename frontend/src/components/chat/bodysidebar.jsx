import React, { useState } from 'react';
import Celebs from './celebs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faGear } from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import '../../assets/chat/default-avatar.png';
import '../../style/chat/bodysidebar.css';

// Component này dùng để hiển thị phần giữa của sidebar, bao gồm thanh tìm kiếm và danh sách các nhân vật nổi tiếng (celebs).
const BodySidebar = ({ celebs, useSelectedCeleb, handleSelect }) => {
  // State để lưu giá trị tìm kiếm
const [search, setSearch] = useState('');
const [showMenu, setShowMenu] = useState(false);
const { user, LogOut } = useAuthStore();
const navigate = useNavigate();

const handleLogout = async () => {
  await LogOut();
  navigate('/auth/login');
}

  // State để lưu danh sách các nhân vật nổi tiếng (celebs) đã được lọc theo từ khóa tìm kiếm
  const filtered = celebs.filter((c) =>
    c.celebName.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div className="sidebar-body">
        <div className="search-bar">
          {/*Thanh tìm kiếm*/}
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <input
            /* Input tìm kiếm */
            className="search-input"
            type="text"
            placeholder="Tìm kiếm nhân vật"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/*Danh sách các nhân vật nổi tiếng (celebs) đã được lọc theo từ khóa tìm kiếm*/}
        <Celebs
          celebs={filtered}
          useSelectedCeleb={useSelectedCeleb}
          handleSelect={handleSelect}
        />
      </div>
      <div className="sidebar-settings">
        <button className="settings-button" onClick={() => setShowMenu(!showMenu)}>
          <FontAwesomeIcon icon={faGear} />
          <span>Cài đặt</span>
        </button>

        {showMenu && (
          <div className="settings-dropdown">
            <div className="account-info">
              <img
                src={user.profilePic || '/default-avatar.png'}
                alt="avatar"
                className="avatar"
              />
              <div className="info-text">
                <p className="name">{user.name}</p>
                <p className="tier">Trạng thái: <span>{user.tier}</span></p>
              </div>
            </div>
            <button className="settings-option" onClick={() => navigate("/payment")}>Nâng cấp gói</button>
            <button className="settings-option" onClick={handleLogout}>Đăng xuất</button>
          </div>
        )}
      </div>
    </>
  );
};

export default BodySidebar;
