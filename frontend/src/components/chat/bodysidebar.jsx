import React, { useState } from 'react';
import Celebs from './celebs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// Component này dùng để hiển thị phần giữa của sidebar, bao gồm thanh tìm kiếm và danh sách các nhân vật nổi tiếng (celebs).
const BodySidebar = ({ celebs, selectedCeleb, handleSelect }) => {
  // State để lưu giá trị tìm kiếm
  const [search, setSearch] = useState('');

  // State để lưu danh sách các nhân vật nổi tiếng (celebs) đã được lọc theo từ khóa tìm kiếm
  const filtered = celebs.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
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
        selectedCeleb={selectedCeleb}
        handleSelect={handleSelect}
      />
    </div>
  );
};

export default BodySidebar;
