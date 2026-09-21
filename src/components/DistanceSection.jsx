import React, { useState } from 'react';
import { Heart, Sparkles, ArrowRight, Send } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import { sfx } from '../utils/soundEffects';

export default function DistanceSection({ onProceedToActivities }) {
  const { distance } = BIRTHDAY_DATA;
  const [heartsSent, setHeartsSent] = useState(1);
  const [flyingHearts, setFlyingHearts] = useState([]);

  const handleSendHeartAcross = () => {
    sfx.playChimeChord();
    setHeartsSent(prev => prev + 1);

    const heartId = Date.now();
    setFlyingHearts(prev => [...prev, { id: heartId }]);

    setTimeout(() => {
      setFlyingHearts(prev => prev.filter(h => h.id !== heartId));
    }, 1800);
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
      <div className="glass-card" style={{
        maxWidth: '880px',
        width: '94%',
        maxHeight: 'calc(100vh - 138px)',
        padding: 'clamp(1.2rem, 3.5vw, 2.2rem)',
        borderRadius: '36px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.85)',
        border: '2px solid rgba(251, 207, 232, 0.95)',
        boxShadow: '0 25px 60px rgba(244, 114, 182, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflowY: 'auto'
      }}>
        {/* Top Tag */}
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#db2777',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '8px',
            padding: '4px 18px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #fdf2f8, #fef3c7)',
            border: '1.5px solid #fbcfe8'
          }}>
            <Sparkles size={14} />
            <span>Across The Distance</span>
            <Sparkles size={14} />
          </div>

          <h2 className="font-serif" style={{
            fontSize: 'clamp(1.5rem, 3.8vw, 2.4rem)',
            color: '#831843',
            fontWeight: 800,
            marginBottom: '6px',
            lineHeight: 1.25
          }}>
            {distance.line1}
          </h2>

          <h3 className="handwriting-accent" style={{
            fontSize: 'clamp(1.6rem, 3.8vw, 2.5rem)',
            color: '#9333ea',
            margin: '0 0 10px 0'
          }}>
            {distance.line2}
          </h3>
        </div>

        {/* Symbolic Constellation / Distance Connection SVG Graphic */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '560px',
          height: '150px',
          margin: '8px auto'
        }}>
          <svg width="100%" height="100%" viewBox="0 0 520 150" fill="none">
            {/* Pulsing Arc connecting both points */}
            <path
              d="M 90 80 Q 260 15 430 80"
              stroke="url(#distLineGrad)"
              strokeWidth="3.5"
              strokeDasharray="6 6"
              style={{
                animation: 'constellationPulse 3s linear infinite'
              }}
            />

            {/* Glowing Heart in the middle */}
            <g style={{ animation: 'gentleFloat 2.5s infinite', transformOrigin: '260px 48px' }}>
              <circle cx="260" cy="48" r="22" fill="url(#centerGlow)" filter="blur(4px)" />
              <circle cx="260" cy="48" r="17" fill="#ffffff" stroke="#ec4899" strokeWidth="2" />
              <path
                d="M 260 56 C 254 50 248 43 252 39 C 256 35 260 38 260 41 C 260 38 264 35 268 39 C 272 43 266 50 260 56 Z"
                fill="#db2777"
              />
            </g>

            {/* Point 1: College & Home with Selfie Avatar */}
            <g>
              <circle cx="90" cy="80" r="30" fill="rgba(244, 114, 182, 0.35)" style={{ animation: 'pulseGlow 2s infinite' }} />
              <circle cx="90" cy="80" r="24" fill="url(#userPhoto)" stroke="#db2777" strokeWidth="2.5" />
              <text x="90" y="132" textAnchor="middle" fill="#831843" fontSize="12" fontWeight="700" fontFamily="sans-serif">
                My College & Home 🏫
              </text>
            </g>

            {/* Point 2: Bujji with Diya Rangoli Avatar */}
            <g>
              <circle cx="430" cy="80" r="30" fill="rgba(192, 132, 252, 0.35)" style={{ animation: 'pulseGlow 2s infinite', animationDelay: '1s' }} />
              <circle cx="430" cy="80" r="24" fill="url(#jashuPhoto)" stroke="#9333ea" strokeWidth="2.5" />
              <text x="430" y="132" textAnchor="middle" fill="#6b21a8" fontSize="12" fontWeight="700" fontFamily="sans-serif">
                Bujji's Place 💖
              </text>
            </g>

            <defs>
              <pattern id="userPhoto" patternUnits="userSpaceOnUse" width="48" height="48" x="66" y="56">
                <image href="./assets/friendship/me-and-jashu-sparkle-selfie.jpg" x="66" y="56" width="48" height="48" preserveAspectRatio="xMidYMid slice" />
              </pattern>
              <pattern id="jashuPhoto" patternUnits="userSpaceOnUse" width="48" height="48" x="406" y="56">
                <image href="./assets/jashu/jashu-diya-rangoli.jpg" x="406" y="56" width="48" height="48" preserveAspectRatio="xMidYMid slice" />
              </pattern>
              <linearGradient id="distLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f472b6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>

          {/* Flying Hearts Traveling Across the Arc */}
          {flyingHearts.map((heart) => (
            <div
              key={heart.id}
              style={{
                position: 'absolute',
                top: '55px',
                left: '90px',
                pointerEvents: 'none',
                animation: 'flyAcrossArc 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
              }}
            >
              <Heart size={24} fill="#db2777" color="#ec4899" style={{ filter: 'drop-shadow(0 4px 8px rgba(219, 39, 119, 0.5))' }} />
            </div>
          ))}
        </div>

        {/* Interactive "Send a Heart Across the Distance" Action Button */}
        <div style={{ margin: '8px 0' }}>
          <button
            onClick={handleSendHeartAcross}
            className="btn-yes btn-yes-super-pulse"
            style={{
              padding: '12px 28px',
              fontSize: '15px',
              borderRadius: '999px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Send size={16} />
            <span>Send a Heart Across The Distance 💌</span>
            <span style={{
              background: 'rgba(255, 255, 255, 0.3)',
              padding: '2px 8px',
              borderRadius: '999px',
              fontSize: '12px'
            }}>
              {heartsSent} sent
            </span>
          </button>
        </div>

        {/* Heartfelt Distance Note */}
        <div style={{
          background: 'linear-gradient(135deg, #fdf2f8, #faf5ff)',
          padding: '12px 22px',
          borderRadius: '20px',
          border: '1.5px solid #fbcfe8',
          maxWidth: '680px',
          margin: '6px auto',
          boxShadow: '0 4px 14px rgba(244, 114, 182, 0.12)'
        }}>
          <p style={{
            fontSize: 'clamp(0.92rem, 2vw, 1.05rem)',
            color: '#374151',
            lineHeight: '1.65',
            margin: 0,
            fontStyle: 'italic'
          }}>
            "Distance may separate our homes and colleges, but it cannot separate our hearts. You are always with me in every thought, Bujji!"
          </p>
        </div>

        {/* Footer & Next Stage Action */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          paddingTop: '10px',
          borderTop: '1.5px dashed #fbcfe8'
        }}>
          <p className="handwriting-accent" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.45rem)', color: '#db2777', margin: 0 }}>
            "Zero kilometers can weaken our bond! 💕"
          </p>

          <button
            onClick={onProceedToActivities}
            className="btn-yes btn-yes-super-pulse"
            style={{
              padding: '10px 24px',
              fontSize: '14px',
              borderRadius: '999px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Little Joy Activities 🪄</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

