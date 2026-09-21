import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, FastForward, RotateCcw, ArrowRight, Mail } from 'lucide-react';
import { sfx } from '../utils/soundEffects';

export default function BirthdayLetter({ onProceedToCollage }) {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [displayedChars, setDisplayedChars] = useState(0);

  const letterBody = `Happy Birthday to You, my dearest Jashu! 🎂💖

I am missing you so much today. I wish I could be right there beside you celebrating this special birthday with laughter, cake, and warm hugs, but even though the distance between our homes and colleges keeps us apart physically, you are always the closest to my heart.

So, here is a special digital birthday surprise crafted with all my love, just for you. I hope it brings a sweet, radiant smile to your face and reminds you how deeply valued you are.

Born at 10:45 AM on this blessed day of September 22nd, you bring boundless joy, warmth, and sunshine to everyone lucky enough to know you. Our friendship is a treasure I will cherish forever.`;

  // Handle Envelope opening
  const handleOpenEnvelope = () => {
    sfx.playChimeChord();
    setEnvelopeOpened(true);
  };

  // Typewriter effect after envelope opens
  useEffect(() => {
    if (!envelopeOpened || isCompleted) return;

    if (displayedChars < letterBody.length) {
      const currentChar = letterBody[displayedChars];
      const delay = currentChar === '.' || currentChar === '!' || currentChar === '?'
        ? 220
        : currentChar === '\n'
          ? 160
          : 18;

      const timer = setTimeout(() => {
        setDisplayedChars(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      setIsCompleted(true);
    }
  }, [envelopeOpened, displayedChars, isCompleted, letterBody]);

  const handleSkip = () => {
    setDisplayedChars(letterBody.length);
    setIsCompleted(true);
  };

  const handleReplay = () => {
    setDisplayedChars(0);
    setIsCompleted(false);
  };

  return (
    <section style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(0.5rem, 2vw, 1.2rem)',
      position: 'relative',
      zIndex: 10,
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* ENVELOPE STAGE (Before Opening) */}
      {!envelopeOpened ? (
        <div
          className="glass-card"
          onClick={handleOpenEnvelope}
          style={{
            maxWidth: '560px',
            width: '92%',
            maxHeight: 'calc(100vh - 138px)',
            overflowY: 'auto',
            padding: 'clamp(2rem, 4vw, 3rem) clamp(1.2rem, 3.5vw, 2.2rem)',
            borderRadius: '36px',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.85)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 25px 60px rgba(244, 114, 182, 0.35)',
            border: '2px solid rgba(251, 207, 232, 0.95)',
            animation: 'gentleFloat 3s infinite'
          }}
        >
          {/* Animated Envelope SVG */}
          <div style={{ position: 'relative', width: '220px', height: '160px', marginBottom: '24px' }}>
            <svg width="220" height="160" viewBox="0 0 220 160" fill="none">
              {/* Envelope Body */}
              <rect x="10" y="30" width="200" height="120" rx="14" fill="#fdf2f8" stroke="#f472b6" strokeWidth="2.5" />

              {/* Fold Lines */}
              <path d="M 10 150 L 110 85 L 210 150" stroke="#fbcfe8" strokeWidth="2" fill="none" />
              <path d="M 10 30 L 110 95 L 210 30" stroke="#f472b6" strokeWidth="2" fill="#fce7f3" />

              {/* Red Wax Seal Stamp */}
              <circle cx="110" cy="95" r="22" fill="#be123c" filter="drop-shadow(0 4px 8px rgba(190, 18, 60, 0.4))" />
              <circle cx="110" cy="95" r="18" fill="#e11d48" />
              <path d="M 110 102 C 105 97 101 92 103 89 C 105 86 109 88 110 90 C 111 88 115 86 117 89 C 119 92 115 97 110 102 Z" fill="#ffffff" />
            </svg>
          </div>

          <h3 className="font-serif" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.1rem)', color: 'var(--color-text-title)', fontWeight: 800, marginBottom: '8px' }}>
            A Sealed Letter For Jashmitha 💌
          </h3>

          <p style={{ fontSize: '15px', color: 'var(--color-secondary)', marginBottom: '24px' }}>
            Sent with infinite love and memories across the distance...
          </p>

          <button
            className="btn-yes btn-yes-super-pulse"
            style={{ padding: '14px 34px', fontSize: '16px', borderRadius: '999px' }}
          >
            <Mail size={19} />
            <span>Tap to Break Seal & Open Letter ✨</span>
          </button>
        </div>
      ) : (
        /* LETTER CONTENT CARD (After Envelope Opens — Desktop 880px, Enhanced Readability) */
        <div
          className="glass-card"
          style={{
            maxWidth: '880px',
            width: '94%',
            maxHeight: 'calc(100vh - 138px)',
            padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1.2rem, 3.5vw, 2.5rem)',
            borderRadius: '32px',
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.85)',
            boxShadow: '0 25px 60px rgba(244, 114, 182, 0.3)',
            border: '2px solid rgba(251, 207, 232, 0.95)',
            overflowY: 'auto',
            animation: 'letterEmerge 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        >
          {/* Action Controls & Top Tag */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            paddingBottom: '12px',
            borderBottom: '1.5px dashed #fbcfe8',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#db2777', fontSize: '13px' }}>
              <Sparkles size={16} />
              <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Personal Birthday Letter</span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {!isCompleted && (
                <button
                  onClick={handleSkip}
                  style={{
                    background: '#fdf2f8',
                    border: '1.5px solid #fbcfe8',
                    borderRadius: '999px',
                    padding: '5px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#db2777',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 8px rgba(244, 114, 182, 0.15)'
                  }}
                >
                  <FastForward size={14} />
                  <span>Read Instantly</span>
                </button>
              )}

              {isCompleted && (
                <button
                  onClick={handleReplay}
                  style={{
                    background: '#fdf2f8',
                    border: '1px solid #fbcfe8',
                    borderRadius: '999px',
                    padding: '5px 14px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#db2777',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <RotateCcw size={13} />
                  <span>Read again</span>
                </button>
              )}
            </div>
          </div>

          {/* 1. OPENING LINE IN BEAUTIFUL HANDWRITING SCRIPT */}
          <div style={{ marginBottom: '16px' }}>
            <span className="handwriting-accent" style={{ fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', color: '#be185d', fontWeight: 700 }}>
              Dear Bujji Jashmitha... 💕
            </span>
          </div>

          {/* 2. MIDDLE HIGHLIGHT IN HANDWRITING SCRIPT */}
          <div style={{
            background: 'linear-gradient(135deg, #fdf2f8, #faf5ff)',
            padding: '12px 22px',
            borderRadius: '20px',
            borderLeft: '5px solid #ec4899',
            marginBottom: '20px',
            boxShadow: '0 4px 14px rgba(244, 114, 182, 0.12)'
          }}>
            <p className="handwriting-accent" style={{ fontSize: 'clamp(1.3rem, 2.8vw, 1.65rem)', color: '#9333ea', margin: 0, lineHeight: 1.4 }}>
              "Distance may separate our homes and colleges, but it cannot separate our hearts."
            </p>
          </div>

          {/* 3. TYPEWRITTEN LETTER BODY (1.15rem, 1.85 line-height for high readability) */}
          <div style={{
            whiteSpace: 'pre-wrap',
            lineHeight: '1.85',
            color: '#374151',
            fontSize: 'clamp(1.02rem, 2.2vw, 1.15rem)',
            fontFamily: 'var(--font-sans)',
            marginBottom: '22px'
          }}>
            {letterBody.slice(0, displayedChars)}

            {!isCompleted && (
              <span style={{
                display: 'inline-block',
                width: '2px',
                height: '1.3em',
                backgroundColor: '#ec4899',
                marginLeft: '3px',
                verticalAlign: 'middle',
                animation: 'softBlink 0.7s infinite'
              }} />
            )}
          </div>

          {/* 4. ENDING LINE IN HANDWRITING SCRIPT */}
          <div style={{
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
            borderRadius: '20px',
            border: '1.5px dashed #f59e0b',
            marginBottom: '22px'
          }}>
            <p className="handwriting-accent" style={{ fontSize: 'clamp(1.35rem, 2.8vw, 1.65rem)', color: '#b45309', margin: 0, lineHeight: 1.4 }}>
              Keep smiling, keep shining, and always remember that you are special. 🎂❤️
            </p>
          </div>

          {/* 5. FINAL SIGNATURE & PROCEED BUTTON */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            paddingTop: '16px',
            borderTop: '1.5px solid #fbcfe8'
          }}>
            <div>
              <p style={{ margin: 0, fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>With lots of love and warm wishes,</p>
              <p className="handwriting-accent" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 1.9rem)', color: '#db2777', margin: '2px 0 0 0' }}>
                Your Friend 💕
              </p>
            </div>

            <button
              onClick={onProceedToCollage}
              className="btn-yes btn-yes-super-pulse"
              style={{
                padding: '12px 26px',
                fontSize: '15px',
                borderRadius: '999px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>Jashu's Lifetime Photo Album 📸</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

