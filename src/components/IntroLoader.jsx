import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';

export default function IntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 70);

    return () => clearInterval(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setFadeOut(true);
    setTimeout(onComplete, 300);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 40%, #f3e8ff 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      opacity: fadeOut ? 0 : 1,
      transform: fadeOut ? 'scale(1.05)' : 'scale(1)',
      pointerEvents: fadeOut ? 'none' : 'auto'
    }}>
      {/* Pulsing Heart Icon */}
      <div style={{
        position: 'relative',
        width: '90px',
        height: '90px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.5) 0%, transparent 70%)',
          animation: 'pulseGlow 2s infinite'
        }} />
        <Heart
          size={52}
          color="#db2777"
          fill="#f472b6"
          style={{ animation: 'gentleFloat 2.5s infinite', filter: 'drop-shadow(0 6px 12px rgba(219, 39, 119, 0.3))' }}
        />
      </div>

      {/* Intro Message */}
      <h2 className="font-serif" style={{
        fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)',
        color: '#831843',
        fontWeight: 700,
        marginBottom: '18px',
        textAlign: 'center',
        padding: '0 20px'
      }}>
        {BIRTHDAY_DATA.introMessage}
      </h2>

      {/* Progress Bar Container */}
      <div style={{
        width: '260px',
        height: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '999px',
        overflow: 'hidden',
        border: '1px solid #fbcfe8',
        boxShadow: '0 4px 12px rgba(244, 114, 182, 0.15)',
        marginBottom: '20px'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #f472b6, #c084fc, #f59e0b)',
          borderRadius: '999px',
          transition: 'width 0.1s linear'
        }} />
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        style={{
          background: 'none',
          border: 'none',
          color: '#9ca3af',
          fontSize: '12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '6px 12px',
          borderRadius: '999px'
        }}
      >
        <span>Skip intro</span>
        <Sparkles size={12} />
      </button>
    </div>
  );
}
