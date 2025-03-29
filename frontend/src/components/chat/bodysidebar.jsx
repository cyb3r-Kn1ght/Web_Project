import React, { useState } from 'react';
import Celebs from './celebs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const BodySidebar = ({ celebs, selectedCeleb, handleSelect }) => {
  const [search, setSearch] = useState('');

  const filtered = celebs.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="sidebar-body">
      <div className="search-bar">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        <input
          className="search-input"
          type="text"
          placeholder="Tìm kiếm nhân vật"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Celebs
        celebs={filtered}
        selectedCeleb={selectedCeleb}
        handleSelect={handleSelect}
      />
    </div>
  );
};

export default BodySidebar;
