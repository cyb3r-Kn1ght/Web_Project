import React from 'react';

const Celebs = ({ celebs, selectedCeleb, handleSelect }) => {
  return (
    <div className="celebs">
      {celebs.map((celeb) => (
        <div
          key={celeb.id}
          className={`celebs-item ${selectedCeleb?.id === celeb.id ? 'selected' : ''}`}
          onClick={() => handleSelect(celeb)}
        >
          <img src={celeb.avatar} alt={celeb.name} className="celebs-avatar" />
          <span className="celebs-name">{celeb.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Celebs;
