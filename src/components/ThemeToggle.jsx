import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    if (isNight) {
      document.documentElement.setAttribute('data-theme', 'night');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isNight]);

  return (
    <button
      onClick={() => setIsNight(!isNight)}
      aria-label={isNight ? 'Switch to Day Dream Theme' : 'Switch to Night Sky Theme'}
      style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        zIndex: 60,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: isNight ? 'rgba(30, 27, 75, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(10px)',
        border: isNight ? '1px solid #4338ca' : '1px solid #fbcfe8',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        color: isNight ? '#fde047' : '#db2777',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease'
      }}
      title={isNight ? 'Switch to Pastel Day Theme' : 'Switch to Romantic Night Sky Theme'}
    >
      {isNight ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
