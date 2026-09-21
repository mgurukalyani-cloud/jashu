import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Bell, Clock, ArrowRight, SkipForward } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import SurpriseButtons from './SurpriseButtons';
import { sfx } from '../utils/soundEffects';

export default function BirthdayLanding({ onSayYes }) {
  // Phased sequence: 1 = Glowing Heart & Teaser, 2 = Name Reveal, 3 = Personal Greeting & Notification, 4 = Question Card
  const [phase, setPhase] = useState(1);
  const [countdownPreview, setCountdownPreview] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Live countdown calculation
    const calc = () => {
      const now = new Date();
      const diff = BIRTHDAY_DATA.birthdayDate.getTime() - now.getTime();
      if (diff > 0) {
        setCountdownPreview({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNextPhase = () => {
    sfx.playChimeChord();
    setPhase(prev => Math.min(prev + 1, 4));
  };

  const handleSkipToQuestion = () => {
    sfx.playChimeChord();
    setPhase(4);
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
      {/* Skip Button during intro phases */}
      {phase < 4 && (
        <button
          onClick={handleSkipToQuestion}
          style={{
            position: 'absolute',
            top: '8px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #fbcfe8',
            borderRadius: '999px',
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#db2777',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            zIndex: 30,
            boxShadow: '0 4px 12px rgba(244, 114, 182, 0.2)'
          }}
          title="Skip intro directly to surprise question"
        >
          <span>Skip to surprise</span>
          <SkipForward size={13} />
        </button>
      )}

      {/* =========================================================================
          PHASE 1: GLOWING HEART & TEASER
          ========================================================================= */}
      {phase === 1 && (
        <div
          className="glass-card"
          style={{
            maxWidth: '640px',
            width: '92%',
            maxHeight: 'calc(100vh - 138px)',
            overflowY: 'auto',
            padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 3rem)',
            borderRadius: '36px',
            boxShadow: '0 25px 60px rgba(244, 114, 182, 0.35)',
            border: '2px solid rgba(251, 207, 232, 0.9)',
            animation: 'fadeIn 0.7s ease-out',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Pulsating Glowing Heart Icon */}
          <div
            onClick={handleNextPhase}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #fce7f3 0%, #fbcfe8 50%, rgba(244, 114, 182, 0.3) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '26px',
              cursor: 'pointer',
              boxShadow: '0 0 40px rgba(236, 72, 153, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.8)',
              animation: 'pulseGlow 2.2s infinite'
            }}
          >
            <Heart size={62} color="#db2777" fill="#ec4899" style={{ animation: 'gentleFloat 2.5s infinite alternate' }} />
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 16px',
            borderRadius: '999px',
            background: '#fdf2f8',
            border: '1px solid #fbcfe8',
            color: '#db2777',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '14px'
          }}>
            <Sparkles size={14} />
            <span>Mystery Birthday Surprise</span>
            <Sparkles size={14} />
          </div>

          <h2 className="font-serif" style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
            color: '#831843',
            fontWeight: 700,
            lineHeight: 1.3,
            marginBottom: '16px'
          }}>
            {BIRTHDAY_DATA.landing.step1Intro}
          </h2>

          <p style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            color: '#6b7280',
            maxWidth: '460px',
            lineHeight: 1.6,
            marginBottom: '30px'
          }}>
            A heartfelt gift created for someone very dear, born at 10:45 AM on September 22nd.
          </p>

          <button
            onClick={handleNextPhase}
            className="btn-yes btn-yes-super-pulse"
            style={{
              padding: '14px 34px',
              fontSize: '16px',
              borderRadius: '999px',
              cursor: 'pointer'
            }}
          >
            <span>Tap to Unveil 💖</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* =========================================================================
          PHASE 2: NAME REVEAL
          ========================================================================= */}
      {phase === 2 && (
        <div
          className="glass-card"
          style={{
            maxWidth: '780px',
            width: '92%',
            maxHeight: 'calc(100vh - 138px)',
            overflowY: 'auto',
            padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 3rem)',
            borderRadius: '36px',
            boxShadow: '0 25px 60px rgba(244, 114, 182, 0.35)',
            border: '2px solid rgba(251, 207, 232, 0.9)',
            animation: 'fadeIn 0.6s ease-out',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 18px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #fdf2f8, #fef3c7)',
            border: '1.5px solid #fbcfe8',
            color: '#db2777',
            fontSize: '13px',
            fontWeight: 700,
            marginBottom: '18px'
          }}>
            <Sparkles size={14} />
            <span>Dedicated To Someone Truly Special</span>
            <Sparkles size={14} />
          </div>

          {/* Cinematic Name Reveal Animation: J · A · S · H · M · I · T · H · A */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(6px, 1.8vw, 16px)',
            margin: '10px 0 20px 0',
            flexWrap: 'wrap'
          }}>
            {BIRTHDAY_DATA.landing.step2Name.map((letter, index) => (
              <span
                key={index}
                className="font-serif"
                style={{
                  fontSize: 'clamp(2.5rem, 6.5vw, 4.5rem)',
                  fontWeight: 800,
                  color: 'var(--color-text-title)',
                  display: 'inline-block',
                  textShadow: '0 4px 16px rgba(244, 114, 182, 0.4)',
                  animation: `gentleFloat 3s ease-in-out infinite alternate`,
                  animationDelay: `${index * 0.12}s`
                }}
              >
                {letter}
              </span>
            ))}
            <span style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginLeft: '4px', animation: 'pulseGlow 2s infinite' }}>
              💗
            </span>
          </div>

          <p style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
            color: '#4b5563',
            maxWidth: '560px',
            lineHeight: 1.65,
            marginBottom: '32px'
          }}>
            {BIRTHDAY_DATA.landing.subtitle}
          </p>

          <button
            onClick={handleNextPhase}
            className="btn-yes btn-yes-super-pulse"
            style={{
              padding: '14px 34px',
              fontSize: '16px',
              borderRadius: '999px',
              cursor: 'pointer'
            }}
          >
            <span>Continue to Birthday Greeting ✨</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* =========================================================================
          PHASE 3: PERSONAL GREETING & NOTIFICATION
          ========================================================================= */}
      {phase === 3 && (
        <div
          className="glass-card"
          style={{
            maxWidth: '820px',
            width: '92%',
            maxHeight: 'calc(100vh - 138px)',
            overflowY: 'auto',
            padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 3rem)',
            borderRadius: '36px',
            boxShadow: '0 25px 60px rgba(244, 114, 182, 0.35)',
            border: '2px solid rgba(251, 207, 232, 0.9)',
            animation: 'fadeIn 0.6s ease-out',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Notification Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 22px',
              borderRadius: '9999px',
              marginBottom: '24px',
              border: '1.5px solid #fbcfe8',
              background: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 8px 24px rgba(244, 114, 182, 0.25)',
              animation: 'gentleFloat 3s ease-in-out infinite'
            }}
          >
            <Bell size={16} color="#db2777" style={{ animation: 'shakeCute 1.2s infinite' }} />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#db2777' }}>
              {BIRTHDAY_DATA.landing.notification}
            </span>
            <Sparkles size={14} color="#f59e0b" />
          </div>

          <h2 className="font-serif" style={{
            fontSize: 'clamp(1.8rem, 4.2vw, 2.7rem)',
            color: '#831843',
            fontWeight: 800,
            lineHeight: 1.3,
            marginBottom: '16px'
          }}>
            {BIRTHDAY_DATA.landing.step3Greeting}
          </h2>

          <p style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
            color: '#4b5563',
            maxWidth: '580px',
            lineHeight: 1.7,
            marginBottom: '24px'
          }}>
            Even though distances and colleges keep us apart, this digital birthday gift was handcrafted
            with every memory, inside joke, and sweet wish for my Bangaaram.
          </p>

          {/* Mini Live Countdown Chip */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '999px',
            background: 'rgba(254, 243, 199, 0.8)',
            border: '1px solid #fde68a',
            color: '#b45309',
            fontSize: '13px',
            fontWeight: 700,
            marginBottom: '32px'
          }}>
            <Clock size={16} />
            <span>September 22, 10:45 AM</span>
            <span>•</span>
            <span>{countdownPreview.days}d {countdownPreview.hours}h {countdownPreview.minutes}m {countdownPreview.seconds}s to go!</span>
          </div>

          <button
            onClick={handleNextPhase}
            className="btn-yes btn-yes-super-pulse"
            style={{
              padding: '16px 38px',
              fontSize: '17px',
              borderRadius: '999px',
              cursor: 'pointer'
            }}
          >
            <span>Proceed to the Surprise Question 🎁</span>
            <ArrowRight size={19} />
          </button>
        </div>
      )}

      {/* =========================================================================
          PHASE 4: SURPRISE QUESTION CARD (DESKTOP PROMINENT & EXPANDED)
          ========================================================================= */}
      {phase === 4 && (
        <div style={{
          width: '100%',
          maxWidth: '880px',
          animation: 'fadeIn 0.6s ease-out',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* Header context badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 20px',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.92)',
            border: '1.5px solid #fbcfe8',
            color: '#db2777',
            fontSize: '13px',
            fontWeight: 700,
            marginBottom: '16px',
            boxShadow: '0 4px 16px rgba(244, 114, 182, 0.2)'
          }}>
            <Heart size={14} fill="#db2777" />
            <span>For Jashmitha (Bujji / Bangaaram) • Born Sept 22 at 10:45 AM</span>
            <Sparkles size={14} color="#f59e0b" />
          </div>

          {/* The YES / NO Interactive Card */}
          <SurpriseButtons onSayYes={onSayYes} />

          {/* Footer Note */}
          <div style={{
            marginTop: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: 'var(--color-text-muted)'
          }}>
            <Heart size={13} color="#ec4899" fill="#ec4899" />
            <span>{BIRTHDAY_DATA.landing.footerText}</span>
          </div>
        </div>
      )}
    </section>
  );
}

