import React, { useState } from 'react';
import { Sparkles, Gift, RotateCcw } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../data/messages';
import { triggerCelebrationConfetti } from '../utils/confetti';

export default function MysteryLanding({ onSayYes }) {
  const [noCount, setNoCount] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [floatingTears, setFloatingTears] = useState([]);

  // Calculate scales
  const noScale = Math.max(0.46, 1 - noCount * 0.08);
  const yesScale = Math.min(1.85, 1 + noCount * 0.14);

  // Emotional messages
  const currentMessage = noCount > 0
    ? BIRTHDAY_CONFIG.noMessages[Math.min(noCount - 1, BIRTHDAY_CONFIG.noMessages.length - 1)]
    : null;

  // Cheer text
  const currentYesText = BIRTHDAY_CONFIG.yesButtonCheerTexts[
    Math.min(noCount, BIRTHDAY_CONFIG.yesButtonCheerTexts.length - 1)
  ];

  // Mascot mood
  const mascotInfo = noCount > 0
    ? BIRTHDAY_CONFIG.mascotStages[Math.min(noCount - 1, BIRTHDAY_CONFIG.mascotStages.length - 1)]
    : null;

  const handleNoClick = (e) => {
    e.stopPropagation();
    const newCount = noCount + 1;
    setNoCount(newCount);
    setShaking(true);
    setTimeout(() => setShaking(false), 600);

    const id = Date.now();
    const newTear = {
      id,
      x: (Math.random() * 40) - 20,
      delay: Math.random() * 0.2
    };
    setFloatingTears(prev => [...prev.slice(-6), newTear]);
    setTimeout(() => {
      setFloatingTears(prev => prev.filter(t => t.id !== id));
    }, 1200);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setNoCount(0);
    setFloatingTears([]);
  };

  const handleYesClick = () => {
    triggerCelebrationConfetti();
    if (onSayYes) {
      onSayYes();
    }
  };

  return (
    <section style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '1.5rem',
      position: 'relative',
      zIndex: 10,
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* Intimate Mystery Card */}
      <div className="glass-card" style={{
        maxWidth: '680px',
        width: '100%',
        padding: 'clamp(2rem, 5vw, 3.2rem) 1.5rem',
        borderRadius: '32px',
        background: 'rgba(255, 255, 255, 0.9)',
        border: '2px solid rgba(251, 207, 232, 0.85)',
        boxShadow: '0 20px 45px rgba(244, 114, 182, 0.2), 0 0 35px rgba(254, 240, 138, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Subtle top badge - ZERO spoilers */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 18px',
          borderRadius: '9999px',
          background: 'rgba(253, 242, 248, 0.95)',
          border: '1px solid #fbcfe8',
          marginBottom: '20px'
        }}>
          <Sparkles size={15} color="#db2777" />
          <span style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#db2777'
          }}>
            A Little Mystery Between Us 🌸
          </span>
        </div>

        {/* Personalized Greeting */}
        <h1 className="font-serif" style={{
          fontSize: 'clamp(2rem, 5vw, 3.4rem)',
          fontWeight: 700,
          lineHeight: 1.2,
          color: '#831843',
          marginBottom: '12px',
          textShadow: '0 2px 8px rgba(244, 114, 182, 0.2)'
        }}>
          Hey Dearest Bujji... 💖
        </h1>

        {/* Secret Subtitle */}
        <p style={{
          fontSize: 'clamp(1rem, 2.8vw, 1.35rem)',
          color: '#6b21a8',
          fontWeight: 400,
          maxWidth: '520px',
          marginBottom: '32px',
          lineHeight: 1.5
        }}>
          I have created a special surprise just for you. Are you ready to see what is waiting for you?
        </p>

        {/* Emotional Message Box & Mascot */}
        {noCount > 0 && (
          <div
            className={`glass-card ${shaking ? 'animate-shake-cute' : ''}`}
            style={{
              marginBottom: '24px',
              padding: '12px 20px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              maxWidth: '92%',
              background: '#ffffff',
              border: '1.5px solid #fbcfe8',
              boxShadow: '0 8px 25px rgba(244, 114, 182, 0.25)',
              position: 'relative'
            }}
          >
            <div style={{ position: 'relative' }}>
              <div style={{
                fontSize: noCount >= 4 ? '32px' : '26px',
                animation: noCount >= 4 ? 'shakeCute 1s infinite alternate' : 'gentleFloat 3s infinite'
              }}>
                {mascotInfo.emoji}
              </div>

              {noCount >= 3 && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  right: '-4px',
                  fontSize: '16px',
                  animation: 'tearDrop 1.2s ease-in infinite'
                }}>
                  💧
                </div>
              )}
            </div>

            <div style={{ textAlign: 'left' }}>
              <p style={{
                fontSize: '15px',
                fontWeight: 600,
                color: '#db2777',
                margin: 0
              }}>
                {currentMessage}
              </p>
              <p style={{
                fontSize: '12px',
                color: '#9333ea',
                margin: '2px 0 0 0',
                fontStyle: 'italic'
              }}>
                {mascotInfo.caption}
              </p>
            </div>

            {floatingTears.map(tear => (
              <span
                key={tear.id}
                style={{
                  position: 'absolute',
                  top: '6px',
                  left: `calc(50% + ${tear.x}px)`,
                  fontSize: '18px',
                  pointerEvents: 'none',
                  animation: 'tearDrop 1s ease-out forwards'
                }}
              >
                💧
              </span>
            ))}
          </div>
        )}

        {/* Buttons Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: `${Math.max(14, 18 + noCount * 4)}px`,
          minHeight: '85px'
        }}>
          {/* YES BUTTON */}
          <button
            onClick={handleYesClick}
            className={`btn-yes ${noCount > 0 ? 'btn-yes-super-pulse' : ''}`}
            style={{
              transform: `scale(${yesScale})`,
              padding: `${14 + Math.min(noCount * 2, 6)}px ${28 + Math.min(noCount * 4, 14)}px`,
              fontSize: `${15 + Math.min(noCount * 1.5, 6)}px`,
              zIndex: 20
            }}
            aria-label="Yes, I want to see"
          >
            <Gift size={18} />
            <span>{currentYesText}</span>
            <Sparkles size={16} />
          </button>

          {/* NO BUTTON */}
          <button
            onClick={handleNoClick}
            className="btn-no"
            style={{
              transform: `scale(${noScale})`,
              padding: '12px 24px',
              fontSize: '14px',
              opacity: Math.max(0.7, 1 - noCount * 0.04),
              zIndex: 10
            }}
            aria-label="No"
          >
            <span>{BIRTHDAY_CONFIG.noButtonInitial}</span>
          </button>
        </div>

        {/* Reset Option */}
        {noCount > 0 && (
          <div style={{ marginTop: '18px' }}>
            <button
              onClick={handleReset}
              style={{
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px'
              }}
            >
              <RotateCcw size={13} />
              <span>Reset buttons</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
