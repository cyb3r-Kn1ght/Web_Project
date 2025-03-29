import React from 'react';

const HistoryChatbox = ({ selectedCeleb }) => {
  return (
    <div className="historychatbox">
      <p style={{ textAlign: 'center', color: '#aaa', fontStyle: 'italic', marginTop: '2rem' }}>
        Nhắn tin với {selectedCeleb.name}
      </p>
    </div>
  );
};

export default HistoryChatbox;
