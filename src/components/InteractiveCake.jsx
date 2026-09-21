import React, { useState } from 'react';
import { Sparkles, Heart, Wind, Utensils, Gift, ArrowRight } from 'lucide-react';
import { triggerCelebrationConfetti, triggerGiftOpenConfetti } from '../utils/confetti';
import { sfx } from '../utils/soundEffects';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import PandaBear from './PandaBear';

export default function InteractiveCake({ onProceedToGift }) {
  const [subStage, setSubStage] = useState('candles'); // 'candles' | 'wishing' | 'bite' | 'hug' | 'ready_for_gift'
  const [candlesLit, setCandlesLit] = useState([true, true, true]);
  const [hasEatenBite, setHasEatenBite] = useState(false);
  const [hugAccepted, setHugAccepted] = useState(false);

  // Handle blowing candles with a gentle "Make a Wish" dimming moment
  const handleBlowCandles = () => {
    // Briefly show the gentle wishing screen
    setSubStage('wishing');
    sfx.playChimeChord();

    setTimeout(() => {
      sfx.playCandleBlow();
      setCandlesLit([false, false, false]);
      triggerCelebrationConfetti();

      setTimeout(() => {
        setSubStage('bite');
      }, 1400);
    }, 1800);
  };

  const handleExtinguishSingle = (index) => {
    sfx.playCandleBlow();
    const updated = [...candlesLit];
    updated[index] = false;
    setCandlesLit(updated);

    if (updated.every(c => !c)) {
      triggerCelebrationConfetti();
      setTimeout(() => {
        setSubStage('bite');
      }, 1200);
    }
  };

  const handleTakeBite = () => {
    setHasEatenBite(true);
    sfx.playChimeChord();
    triggerGiftOpenConfetti();

    setTimeout(() => {
      setSubStage('hug');
    }, 1400);
  };

  const handleAcceptHug = () => {
    setHugAccepted(true);
    sfx.playChimeChord();
    triggerCelebrationConfetti();

    setTimeout(() => {
      setSubStage('ready_for_gift');
    }, 1500);
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
        position: 'relative',
        boxShadow: '0 25px 60px rgba(244, 114, 182, 0.3)',
        border: '2px solid rgba(251, 207, 232, 0.95)',
        background: 'rgba(255, 255, 255, 0.85)'
      }}>

        {/* =========================================================================
            STAGE 1A: WISHING DIM OVERLAY (Close eyes and make a special wish)
            ========================================================================= */}
        {subStage === 'wishing' && (
          <div style={{
            padding: '2.5rem 1.5rem',
            animation: 'fadeIn 0.5s ease-out',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #fef08a 0%, #f59e0b 60%, transparent 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              animation: 'pulseGlow 1.5s infinite alternate'
            }}>
              <Sparkles size={45} color="#ffffff" />
            </div>

            <h2 className="font-serif" style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)',
              color: '#831843',
              fontWeight: 800,
              marginBottom: '12px'
            }}>
              Close Your Eyes & Make a Wish... ✨
            </h2>

            <p style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
              color: '#4b5563',
              maxWidth: '560px',
              lineHeight: 1.7,
              margin: '0 auto'
            }}>
              Think of the happiest, most beautiful wish in your heart, Bujji.
              Ready? Blowing out the candles right now! 💨✨
            </p>
          </div>
        )}

        {/* =========================================================================
            STAGE 1: THE BIRTHDAY CAKE & BLOW CANDLES
            ========================================================================= */}
        {subStage === 'candles' && (
          <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 18px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #fdf2f8, #fef3c7)',
              border: '1.5px solid #fbcfe8',
              color: 'var(--color-primary)',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '14px'
            }}>
              <Sparkles size={14} />
              <span>{BIRTHDAY_DATA.celebration.heading}</span>
              <Sparkles size={14} />
            </div>

            <h2 className="font-serif" style={{
              fontSize: 'clamp(1.8rem, 4.2vw, 2.8rem)',
              color: 'var(--color-text-title)',
              fontWeight: 800,
              marginBottom: '8px'
            }}>
              Happy Birthday, My Dearest Jashu! 🎂💖
            </h2>

            <p style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
              color: 'var(--color-secondary)',
              marginBottom: '24px',
              maxWidth: '620px',
              margin: '0 auto 24px auto'
            }}>
              Close your eyes, make a special wish in your heart, and blow out your candles! ✨
            </p>

            {/* ENHANCED LARGER SVG BIRTHDAY CAKE WITH CANDLES */}
            <div style={{
              position: 'relative',
              width: '280px',
              height: '240px',
              margin: '0 auto 24px auto',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <svg width="280" height="240" viewBox="0 0 280 240" fill="none">
                {/* Cake Stand Base */}
                <ellipse cx="140" cy="225" rx="120" ry="14" fill="#fbcfe8" />
                <ellipse cx="140" cy="220" rx="108" ry="11" fill="#ffffff" stroke="#f472b6" strokeWidth="2.5" />

                {/* Bottom Cake Tier */}
                <rect x="45" y="145" width="190" height="72" rx="12" fill="#fdf2f8" stroke="#f472b6" strokeWidth="2" />
                {/* Dripping Strawberry Glaze */}
                <path d="M 45 160 Q 65 178 85 160 Q 105 180 125 160 Q 145 180 165 160 Q 185 180 205 160 Q 220 174 235 160 L 235 145 L 45 145 Z" fill="#f472b6" />
                {/* Pearls on Bottom Tier */}
                <circle cx="75" cy="188" r="4" fill="#f59e0b" />
                <circle cx="115" cy="192" r="4" fill="#ec4899" />
                <circle cx="140" cy="188" r="4" fill="#38bdf8" />
                <circle cx="165" cy="192" r="4" fill="#a855f7" />
                <circle cx="205" cy="188" r="4" fill="#f59e0b" />

                {/* Top Cake Tier */}
                <rect x="75" y="85" width="130" height="62" rx="10" fill="#ffffff" stroke="#f472b6" strokeWidth="2" />
                {/* Glaze Dripping on Top Tier */}
                <path d="M 75 102 Q 95 116 110 102 Q 125 118 140 102 Q 155 118 170 102 Q 190 114 205 102 L 205 85 L 75 85 Z" fill="#ec4899" />

                {/* Cherries / Strawberries on top */}
                <circle cx="95" cy="80" r="6" fill="#e11d48" filter="drop-shadow(0 2px 4px rgba(225, 29, 72, 0.4))" />
                <circle cx="140" cy="80" r="6" fill="#e11d48" filter="drop-shadow(0 2px 4px rgba(225, 29, 72, 0.4))" />
                <circle cx="185" cy="80" r="6" fill="#e11d48" filter="drop-shadow(0 2px 4px rgba(225, 29, 72, 0.4))" />

                {/* 3 CANDLES */}
                {[
                  { x: 105, lit: candlesLit[0], index: 0 },
                  { x: 140, lit: candlesLit[1], index: 1 },
                  { x: 175, lit: candlesLit[2], index: 2 }
                ].map(({ x, lit, index }) => (
                  <g key={index} onClick={() => lit && handleExtinguishSingle(index)} style={{ cursor: lit ? 'pointer' : 'default' }}>
                    <rect x={x - 4} y="44" width="8" height="38" rx="2" fill="url(#cakeCandleGrad)" stroke="#f59e0b" strokeWidth="1" />
                    <line x1={x} y1="39" x2={x} y2="44" stroke="#374151" strokeWidth="1.5" />

                    {lit ? (
                      <g style={{
                        transformOrigin: `${x}px 32px`,
                        animation: 'flameFlicker 0.6s infinite alternate'
                      }}>
                        <circle cx={x} cy="30" r="12" fill="rgba(253, 224, 71, 0.45)" filter="blur(4px)" />
                        <path d={`M ${x} 18 Q ${x + 7} 28 ${x} 38 Q ${x - 7} 28 ${x} 18 Z`} fill="#f59e0b" />
                        <path d={`M ${x} 22 Q ${x + 3.5} 29 ${x} 36 Q ${x - 3.5} 29 ${x} 22 Z`} fill="#fef08a" />
                      </g>
                    ) : (
                      <g style={{ animation: 'smokePuff 1.5s ease-out forwards' }}>
                        <circle cx={x} cy="30" r="5" fill="rgba(156, 163, 175, 0.6)" />
                        <circle cx={x + 3} cy="20" r="6" fill="rgba(156, 163, 175, 0.4)" />
                        <circle cx={x - 4} cy="10" r="7" fill="rgba(156, 163, 175, 0.2)" />
                      </g>
                    )}
                  </g>
                ))}

                <defs>
                  <linearGradient id="cakeCandleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#fde047" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <button
              onClick={handleBlowCandles}
              className="btn-yes btn-yes-super-pulse"
              style={{
                padding: '16px 36px',
                fontSize: '17px',
                borderRadius: '999px',
                cursor: 'pointer'
              }}
              aria-label="Make a Wish and Blow the Candles"
            >
              <Wind size={20} />
              <span>Make a Wish & Blow Candles 🕯️💨</span>
            </button>

            <div style={{ marginTop: '14px', color: 'var(--color-text-muted)', fontSize: '12px' }}>
              💡 Tip: You can also tap each candle directly to blow it out!
            </div>
          </div>
        )}

        {/* =========================================================================
            STAGE 2: FIRST BITE FROM MY SIDE 🍰
            ========================================================================= */}
        {subStage === 'bite' && (
          <div style={{ animation: 'fadeIn 0.7s ease-out' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 18px',
              borderRadius: '999px',
              background: '#fef3c7',
              border: '1.5px solid #fde68a',
              color: '#d97706',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '14px'
            }}>
              <Utensils size={14} />
              <span>First Bite Tradition 🍰</span>
            </div>

            <h2 className="font-serif" style={{
              fontSize: 'clamp(1.8rem, 4.2vw, 2.8rem)',
              color: 'var(--color-text-title)',
              fontWeight: 800,
              marginBottom: '8px'
            }}>
              First Sweet Bite is From Me! 🍰
            </h2>

            <p style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
              color: 'var(--color-secondary)',
              marginBottom: '20px'
            }}>
              Open your mouth, Bangaaram... Say <strong>Aaaaa~ 🥰</strong>
            </p>

            <div style={{
              margin: '16px auto 26px auto',
              width: '180px',
              height: '130px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: hasEatenBite ? 'gentleFloat 2s infinite' : 'pulseGlow 2.5s infinite'
            }}>
              <div style={{
                fontSize: '86px',
                transform: hasEatenBite ? 'scale(1.15) rotate(-6deg)' : 'scale(1)',
                transition: 'all 0.4s ease'
              }}>
                {hasEatenBite ? '😋💖' : '🍰🍴'}
              </div>
            </div>

            {!hasEatenBite ? (
              <button
                onClick={handleTakeBite}
                className="btn-yes btn-yes-super-pulse"
                style={{
                  padding: '16px 36px',
                  fontSize: '17px',
                  borderRadius: '999px',
                  cursor: 'pointer'
                }}
              >
                <span>Take a Bite! 😋</span>
                <Heart size={18} fill="#ffffff" />
              </button>
            ) : (
              <div style={{
                padding: '14px 28px',
                background: '#fdf2f8',
                borderRadius: '999px',
                display: 'inline-block',
                color: '#db2777',
                fontWeight: 700,
                fontSize: '15px',
                boxShadow: '0 6px 18px rgba(244, 114, 182, 0.2)'
              }}>
                Mmm, delicious! Pure sweetness for my sweetest Jashu (Bangaaram)! 💕
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            STAGE 3: BIRTHDAY WISHES & A WARM HUG 🤗
            ========================================================================= */}
        {subStage === 'hug' && (
          <div style={{ animation: 'fadeIn 0.7s ease-out' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 18px',
              borderRadius: '999px',
              background: '#f3e8ff',
              border: '1.5px solid #e9d5ff',
              color: '#9333ea',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '14px'
            }}>
              <Heart size={14} fill="#9333ea" />
              <span>Endless Warmth</span>
            </div>

            <h2 className="font-serif" style={{
              fontSize: 'clamp(1.8rem, 4.2vw, 2.8rem)',
              color: 'var(--color-text-title)',
              fontWeight: 800,
              marginBottom: '10px'
            }}>
              A Tight Birthday Hug for You! 🤗💖
            </h2>

            <p style={{
              fontSize: 'clamp(0.95rem, 2.2vw, 1.15rem)',
              color: 'var(--color-text-body)',
              maxWidth: '600px',
              margin: '0 auto 20px auto',
              lineHeight: '1.7'
            }}>
              Even though distance separates our colleges and homes, my warmest hug reaches you right now. You are forever treasured and never alone!
            </p>

            <div style={{
              margin: '0 auto 16px auto',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <PandaBear isSmiling={hugAccepted} size={150} />
            </div>

            {!hugAccepted ? (
              <button
                onClick={handleAcceptHug}
                className="btn-yes btn-yes-super-pulse"
                style={{
                  padding: '16px 36px',
                  fontSize: '17px',
                  borderRadius: '999px',
                  cursor: 'pointer'
                }}
              >
                <span>Receive Warm Hug 🫂</span>
                <Heart size={18} fill="#ffffff" />
              </button>
            ) : (
              <div style={{
                padding: '14px 28px',
                background: '#faf5ff',
                borderRadius: '999px',
                display: 'inline-block',
                color: '#9333ea',
                fontWeight: 700,
                fontSize: '15px',
                boxShadow: '0 6px 18px rgba(168, 85, 247, 0.2)'
              }}>
                Warm, tight hug received! Wrapped in pure love! 💖
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            STAGE 4: PROCEED TO SURPRISE GIFT BOX
            ========================================================================= */}
        {subStage === 'ready_for_gift' && (
          <div style={{ animation: 'fadeIn 0.7s ease-out' }}>
            <div style={{
              fontSize: '68px',
              marginBottom: '12px',
              animation: 'gentleFloat 2.5s infinite'
            }}>
              🎁✨
            </div>

            <h2 className="font-serif" style={{
              fontSize: 'clamp(1.8rem, 4.2vw, 2.8rem)',
              color: 'var(--color-text-title)',
              fontWeight: 800,
              marginBottom: '12px'
            }}>
              Ready for Your Birthday Gift Box?
            </h2>

            <p style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
              color: 'var(--color-secondary)',
              marginBottom: '28px',
              maxWidth: '560px',
              margin: '0 auto 28px auto',
              lineHeight: '1.6'
            }}>
              Your 3D birthday gift box is glowing and waiting to be opened, Jashu!
            </p>

            <button
              onClick={onProceedToGift}
              className="btn-yes btn-yes-super-pulse"
              style={{
                padding: '18px 42px',
                fontSize: '18px',
                borderRadius: '999px',
                cursor: 'pointer'
              }}
            >
              <Gift size={22} />
              <span>Open Your Surprise Gift Box 🎁✨</span>
              <Sparkles size={19} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

