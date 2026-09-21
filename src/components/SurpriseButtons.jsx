import React, { useState } from 'react';
import { Gift, RotateCcw, Sparkles, Heart } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import { triggerCelebrationConfetti, triggerFireworksShower } from '../utils/confetti';
import { sfx } from '../utils/soundEffects';
import PandaBear from './PandaBear';

export default function SurpriseButtons({ onSayYes }) {
  const [noCount, setNoCount] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [isSmiling, setIsSmiling] = useState(false);

  const { question } = BIRTHDAY_DATA;

  // Controlled Scaling calculations:
  // NO button shrinks gently but stays usable (clamped to min 0.65)
  // YES button grows to a controlled maximum (clamped to max 1.45)
  const noScale = Math.max(0.65, 1 - noCount * 0.05);
  const yesScale = Math.min(1.45, 1 + noCount * 0.065);

  const currentMessage = noCount > 0
    ? question.noMessages[Math.min(noCount - 1, question.noMessages.length - 1)]
    : null;

  const currentYesText = question.yesCheerTexts[
    Math.min(noCount, question.yesCheerTexts.length - 1)
  ];

  const mascotMood = noCount > 0
    ? question.mascotMoods[Math.min(noCount - 1, question.mascotMoods.length - 1)]
    : null;

  const handleNoClick = (e) => {
    e.stopPropagation();
    const newCount = noCount + 1;
    setNoCount(newCount);
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setNoCount(0);
    setIsSmiling(false);
  };

  const handleYesClick = () => {
    setIsSmiling(true);
    sfx.playChimeChord();
    triggerCelebrationConfetti();
    triggerFireworksShower(4000);

    // Give 1.6s to enjoy the joyful smiling panda and celebratory message before navigating!
    setTimeout(() => {
      if (onSayYes) {
        onSayYes();
      }
    }, 1600);
  };

  return (
    <div className="glass-card" style={{
      padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1.2rem, 3.5vw, 2.5rem)',
      borderRadius: '36px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      maxWidth: '840px',
      maxHeight: 'calc(100vh - 150px)',
      overflowY: 'auto',
      position: 'relative',
      boxShadow: '0 25px 60px rgba(244, 114, 182, 0.3)',
      border: '2px solid rgba(251, 207, 232, 0.95)'
    }}>
      {/* Question Title */}
      <h2 className="font-serif" style={{
        fontSize: 'clamp(1.5rem, 3.8vw, 2.3rem)',
        color: 'var(--color-text-title)',
        fontWeight: 800,
        marginBottom: '18px',
        lineHeight: 1.3,
        textAlign: 'center'
      }}>
        {question.title}
      </h2>

      {/* WHEN YES IS CLICKED: Radiant Smiling Panda with Joyful Message */}
      {isSmiling && (
        <div style={{ animation: 'fadeIn 0.4s ease-out', marginBottom: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <PandaBear
            isCrying={false}
            isSmiling={true}
            noCount={0}
            size={150}
          />
          <div style={{
            background: 'linear-gradient(135deg, #ec4899, #db2777)',
            color: '#ffffff',
            padding: '10px 24px',
            borderRadius: '999px',
            fontSize: '15px',
            fontWeight: 700,
            boxShadow: '0 8px 24px rgba(236, 72, 153, 0.45)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '8px',
            animation: 'gentleFloat 1.5s infinite alternate'
          }}>
            <Heart size={18} fill="#ffffff" />
            <span>Yayyy! You made me happy! Let's open your surprise! 🎉💖</span>
          </div>
        </div>
      )}

      {/* WHEN NO IS CLICKED: Side-by-Side Crying Mascot & Emotional Plea Speech Bubble */}
      {noCount > 0 && !isSmiling && (
        <div
          className={`glass-card ${shaking ? 'animate-shake-cute' : ''}`}
          style={{
            marginBottom: '24px',
            padding: '14px 22px',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            width: '100%',
            maxWidth: '640px',
            background: 'linear-gradient(135deg, #fff5f7, #ffffff)',
            border: '2px solid #fbcfe8',
            boxShadow: '0 10px 30px rgba(244, 114, 182, 0.25)',
            position: 'relative'
          }}
        >
          {/* Crying Panda Mascot beside the message */}
          <div style={{ flexShrink: 0 }}>
            <PandaBear
              isCrying={true}
              isSmiling={false}
              noCount={noCount}
              size={95}
            />
          </div>

          <div style={{ textAlign: 'left', flex: 1 }}>
            <p style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
              fontWeight: 700,
              color: 'var(--color-primary)',
              margin: '0 0 4px 0',
              lineHeight: 1.3
            }}>
              {currentMessage}
            </p>
            <p style={{
              fontSize: '13px',
              color: 'var(--color-secondary)',
              margin: 0,
              fontStyle: 'italic'
            }}>
              {mascotMood.caption}
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: `${Math.max(16, 20 + noCount * 4)}px`,
        minHeight: '90px',
        padding: '8px'
      }}>
        {/* YES BUTTON with warm glow and controlled scaling */}
        <button
          onClick={handleYesClick}
          className={`btn-yes ${noCount > 0 ? 'btn-yes-super-pulse' : ''}`}
          style={{
            transform: `scale(${yesScale})`,
            padding: `${16 + Math.min(noCount * 1.5, 6)}px ${34 + Math.min(noCount * 3, 12)}px`,
            fontSize: `${16 + Math.min(noCount * 1.2, 5)}px`,
            zIndex: 20
          }}
          aria-label="Yes, I Want a Surprise"
        >
          <Gift size={20 + Math.min(noCount, 4)} style={{ animation: 'gentleFloat 2s infinite' }} />
          <span>{currentYesText}</span>
          <Sparkles size={18 + Math.min(noCount, 3)} />
        </button>

        {/* NO BUTTON (Clamped to 0.65 minimum, stays easily clickable) */}
        {!isSmiling && (
          <button
            onClick={handleNoClick}
            className="btn-no"
            style={{
              transform: `scale(${noScale})`,
              padding: '14px 28px',
              fontSize: '15px',
              opacity: Math.max(0.75, 1 - noCount * 0.03),
              zIndex: 10
            }}
            aria-label="No"
          >
            <span>{question.noInitial}</span>
          </button>
        )}
      </div>

      {/* Reset Option */}
      {noCount > 0 && !isSmiling && (
        <div style={{ marginTop: '16px' }}>
          <button
            onClick={handleReset}
            style={{
              background: '#fdf2f8',
              border: '1px solid #fbcfe8',
              color: '#db2777',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '999px',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(244, 114, 182, 0.15)'
            }}
          >
            <RotateCcw size={13} />
            <span>Reset buttons (Try again)</span>
          </button>
        </div>
      )}
    </div>
  );
}

