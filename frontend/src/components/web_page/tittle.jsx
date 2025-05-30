import React from 'react';

const styles = {
  section: {
    marginTop: '15rem',
    fontFamily: '"Poppins", sans-serif',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
    color: '#1d4ed8',
    letterSpacing: '-0.02em',
  },
  h1: {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 700,
    fontSize: '3rem',
    background: '#1d4ed8',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    textShadow: '0 1px 3px rgba(0,0,0,0.3)',
    marginBottom: '1rem',
    letterSpacing: '-0.03em',
  },
  h2: {
    marginTop: 0,
    textShadow: '0 1px 3px rgba(0,0,0,0.3)',
    paddingTop: 0,
  },
  responsive: `@media (max-width: 768px) {
    h1 { font-size: 2rem; }
    h2 { font-size: 1rem; }
    section { margin-top: 8rem; padding: 0 1rem; }
  }`
};

function Title() {
  return (
    <section style={styles.section}>
      <h1 style={styles.h1}>AI ChatBot</h1>
      <h2 style={styles.h2}>Trò chuyện cùng các Idol</h2>
    </section>
  );
}

export default React.memo(Title);
