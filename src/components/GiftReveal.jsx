import React, { useState } from 'react';
import { Sparkles, Heart, Mail, Gift } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import { triggerGiftOpenConfetti } from '../utils/confetti';
import { sfx } from '../utils/soundEffects';

export default function GiftReveal({ onProceedToLetter }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openingInProgress, setOpeningInProgress] = useState(false);

  const { gift } = BIRTHDAY_DATA;

  const handleOpenGift = () => {
    if (isOpen || openingInProgress) return;

    setOpeningInProgress(true);
    sfx.playGiftOpen();
    triggerGiftOpenConfetti();

    setTimeout(() => {
      setIsOpen(true);
      setOpeningInProgress(false);
    }, 1100);
  };

  return (
    <section style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 'clamp(0.5rem, 2vw, 1.2rem)',
      position: 'relative',
      zIndex: 10,
      boxSizing: 'border-box'
    }}>
      <div className="glass-card" style={{
        maxWidth: '880px',
        width: '94%',
        maxHeight: 'calc(100vh - 138px)',
        overflowY: 'auto',
        padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1.2rem, 3.5vw, 2.5rem)',
        borderRadius: '36px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.85)',
        border: '2px solid rgba(251, 207, 232, 0.95)',
        boxShadow: '0 25px 60px rgba(244, 114, 182, 0.3)'
      }}>
        {/* Top Tag */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 18px',
          borderRadius: '999px',
          background: 'linear-gradient(135deg, #fdf2f8, #fef3c7)',
          border: '1.5px solid #fbcfe8',
          color: '#db2777',
          fontSize: '12px',
          fontWeight: 700,
          textTransform: 'uppercase',
          marginBottom: '14px'
        }}>
          <Sparkles size={14} />
          <span>A Special Gift For Bujji</span>
          <Sparkles size={14} />
        </div>

        {/* Title */}
        <h2 className="font-serif" style={{
          fontSize: 'clamp(1.9rem, 4.5vw, 2.8rem)',
          color: 'var(--color-text-title)',
          marginBottom: '8px',
          fontWeight: 800
        }}>
          {gift.waitingText}
        </h2>

        <p style={{
          fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
          color: 'var(--color-secondary)',
          marginBottom: '26px',
          maxWidth: '560px',
          lineHeight: 1.6
        }}>
          {gift.heartNote}
        </p>

        {/* Gift Box Graphic Stage */}
        <div style={{
          position: 'relative',
          width: '260px',
          height: '250px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isOpen ? 'default' : 'pointer',
          marginBottom: '28px'
        }} onClick={handleOpenGift}>

          {/* Radiant Light Rays Behind Box */}
          {(openingInProgress || isOpen) && (
            <div style={{
              position: 'absolute',
              width: '340px',
              height: '340px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(253, 224, 71, 0.75) 0%, rgba(244, 114, 182, 0.45) 45%, transparent 70%)',
              animation: 'lightBeamPulse 1.8s ease-in-out infinite',
              zIndex: 1,
              pointerEvents: 'none'
            }} />
          )}

          {/* Outer Glow Halo */}
          <div style={{
            position: 'absolute',
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(244, 114, 182, 0.4) 0%, rgba(192, 132, 252, 0.25) 60%, transparent 80%)',
            filter: 'blur(20px)',
            animation: 'pulseGlow 3s ease-in-out infinite'
          }} />

          {/* 3D-styled Gift Box: Displays uploaded 3D rendered open box when opened */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            animation: !isOpen ? 'gentleFloat 3.8s ease-in-out infinite' : 'pulseGlow 2.5s infinite'
          }}>
            {isOpen ? (
              <div style={{ animation: 'fadeIn 0.6s ease-out', position: 'relative' }}>
                <img
                  src="/assets/gift-box-3d.png"
                  alt="3D Open Gift Box with Floating Hearts"
                  style={{
                    width: '230px',
                    height: '230px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 12px 30px rgba(244, 114, 182, 0.5))'
                  }}
                />
              </div>
            ) : (
              <svg width="190" height="190" viewBox="0 0 180 180" fill="none">
                <ellipse cx="90" cy="168" rx="70" ry="11" fill="rgba(219, 39, 119, 0.2)" />

                {/* Gift Box Base */}
                <rect
                  x="28"
                  y="68"
                  width="124"
                  height="94"
                  rx="14"
                  fill="url(#boxGradient)"
                  stroke="#f472b6"
                  strokeWidth="2.5"
                />

                {/* Ribbons */}
                <rect x="78" y="68" width="24" height="94" fill="url(#goldRibbon)" />
                <rect x="28" y="105" width="124" height="20" fill="url(#goldRibbon)" />

                {/* Animated Lid */}
                <g style={{
                  transformOrigin: '90px 70px',
                  animation: openingInProgress ? 'giftBoxLidOpen 1.1s cubic-bezier(0.2, 0.8, 0.3, 1) forwards' : 'none',
                  transition: 'transform 0.5s ease'
                }}>
                  <rect
                    x="20"
                    y="50"
                    width="140"
                    height="26"
                    rx="8"
                    fill="url(#lidGradient)"
                    stroke="#ec4899"
                    strokeWidth="2"
                    filter="drop-shadow(0 6px 12px rgba(219, 39, 119, 0.25))"
                  />
                  <rect x="78" y="50" width="24" height="26" fill="url(#goldRibbon)" />

                  {/* Bow */}
                  <path
                    d="M 60 46 C 45 23 72 18 85 43 C 88 48 92 48 95 43 C 108 18 135 23 120 46 C 110 58 90 53 90 53 C 90 53 70 58 60 46 Z"
                    fill="url(#goldRibbon)"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                  />
                  <circle cx="90" cy="48" r="7" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                </g>

                <defs>
                  <linearGradient id="boxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fdf2f8" />
                    <stop offset="50%" stopColor="#fce7f3" />
                    <stop offset="100%" stopColor="#fbcfe8" />
                  </linearGradient>
                  <linearGradient id="lidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#fce7f3" />
                  </linearGradient>
                  <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                </defs>
              </svg>
            )}
          </div>
        </div>

        {/* Action Button */}
        {!isOpen ? (
          <button
            onClick={handleOpenGift}
            className="btn-yes btn-yes-super-pulse"
            style={{
              padding: '18px 40px',
              fontSize: '18px',
              borderRadius: '9999px',
              cursor: 'pointer'
            }}
            aria-label="Tap to Open Your Gift"
          >
            <Sparkles size={20} />
            <span>{gift.buttonText}</span>
            <Heart size={18} fill="#ffffff" />
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 24px',
              borderRadius: '999px',
              background: '#fdf2f8',
              border: '1.5px solid #fbcfe8',
              color: 'var(--color-primary)',
              fontWeight: 700,
              fontSize: '15px'
            }}>
              <Sparkles size={16} />
              <span>Surprise Unwrapped! Your birthday letter is waiting 💖</span>
            </div>

            <button
              onClick={onProceedToLetter}
              className="btn-yes btn-yes-super-pulse"
              style={{
                padding: '18px 40px',
                fontSize: '18px',
                borderRadius: '999px',
                cursor: 'pointer'
              }}
            >
              <Mail size={20} />
              <span>Read Your Personal Birthday Letter 📜✨</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

