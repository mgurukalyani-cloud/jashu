import React, { useState } from 'react';
import { Heart, Sparkles, Star, Cake, Gift, ArrowRight, ArrowLeft } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import { sfx } from '../utils/soundEffects';

export default function FriendshipTimeline({ onProceedToDistance }) {
  const { timeline } = BIRTHDAY_DATA;
  const [activeIndex, setActiveIndex] = useState(0);

  const getIcon = (type) => {
    switch (type) {
      case 'sparkle': return <Sparkles size={20} />;
      case 'heart': return <Heart size={20} fill="currentColor" />;
      case 'star': return <Star size={20} fill="currentColor" />;
      case 'cake': return <Cake size={20} />;
      case 'gift': return <Gift size={20} />;
      default: return <Heart size={20} />;
    }
  };

  const handleNext = () => {
    sfx.playChimeChord();
    if (activeIndex < timeline.length - 1) {
      setActiveIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    sfx.playChimeChord();
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  const currentItem = timeline[activeIndex];

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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.85)',
        boxShadow: '0 25px 60px rgba(244, 114, 182, 0.3)',
        border: '2px solid rgba(251, 207, 232, 0.95)',
        overflowY: 'auto'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
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
            marginBottom: '8px'
          }}>
            <Sparkles size={14} />
            <span>Our Journey Through Time</span>
            <Sparkles size={14} />
          </div>

          <h2 className="font-serif" style={{
            fontSize: 'clamp(1.7rem, 4vw, 2.5rem)',
            color: 'var(--color-text-title)',
            fontWeight: 800,
            margin: '0 0 4px 0'
          }}>
            Friendship Milestones ✨
          </h2>

          <p style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
            color: 'var(--color-secondary)',
            margin: 0
          }}>
            Every chapter of our friendship is etched in my heart forever.
          </p>
        </div>

        {/* Milestone Year Selector Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          margin: '10px 0',
          flexWrap: 'wrap'
        }}>
          {timeline.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                onClick={() => {
                  sfx.playChimeChord();
                  setActiveIndex(index);
                }}
                style={{
                  padding: '8px 18px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: isActive ? '2px solid #db2777' : '1px solid #fbcfe8',
                  background: isActive ? 'linear-gradient(135deg, #f472b6, #db2777)' : '#ffffff',
                  color: isActive ? '#ffffff' : '#6b7280',
                  boxShadow: isActive ? '0 6px 18px rgba(219, 39, 119, 0.35)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{item.year}</span>
                {isActive && <Heart size={13} fill="#ffffff" />}
              </button>
            );
          })}
        </div>

        {/* Active Milestone Highlight Card (Enlarged to 720px on desktop) */}
        <div
          key={activeIndex}
          className="glass-card"
          style={{
            width: '100%',
            maxWidth: '720px',
            padding: 'clamp(1.5rem, 3.5vw, 2.2rem)',
            borderRadius: '26px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #fff5f7 0%, #faf5ff 100%)',
            border: '2px solid #fbcfe8',
            boxShadow: '0 12px 32px rgba(244, 114, 182, 0.2)',
            animation: 'fadeIn 0.35s ease-out',
            margin: '6px 0'
          }}
        >
          {/* Milestone Icon Node */}
          <div style={{
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f472b6, #db2777)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            margin: '0 auto 12px auto',
            boxShadow: '0 8px 20px rgba(219, 39, 119, 0.35)'
          }}>
            {getIcon(currentItem.icon)}
          </div>

          <span style={{
            display: 'inline-block',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#db2777',
            background: '#fdf2f8',
            padding: '4px 16px',
            borderRadius: '999px',
            border: '1px solid #fbcfe8',
            marginBottom: '10px'
          }}>
            Chapter {activeIndex + 1} • {currentItem.year}
          </span>

          <h3 className="font-serif" style={{
            fontSize: 'clamp(1.4rem, 3.2vw, 1.85rem)',
            color: '#831843',
            fontWeight: 800,
            marginBottom: '10px'
          }}>
            {currentItem.title}
          </h3>

          <p style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.08rem)',
            color: '#4b5563',
            lineHeight: '1.75',
            maxWidth: '600px',
            margin: '0 auto 16px auto'
          }}>
            {currentItem.description}
          </p>

          {/* Stepper controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '12px'
          }}>
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              style={{
                background: '#ffffff',
                border: '1px solid #fbcfe8',
                borderRadius: '999px',
                padding: '6px 16px',
                fontSize: '12px',
                fontWeight: 700,
                color: activeIndex === 0 ? '#d1d5db' : '#db2777',
                cursor: activeIndex === 0 ? 'default' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <ArrowLeft size={14} />
              <span>Previous Memory</span>
            </button>

            <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 700 }}>
              {activeIndex + 1} / {timeline.length}
            </span>

            <button
              onClick={handleNext}
              disabled={activeIndex === timeline.length - 1}
              style={{
                background: '#ffffff',
                border: '1px solid #fbcfe8',
                borderRadius: '999px',
                padding: '6px 16px',
                fontSize: '12px',
                fontWeight: 700,
                color: activeIndex === timeline.length - 1 ? '#d1d5db' : '#db2777',
                cursor: activeIndex === timeline.length - 1 ? 'default' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>Next Memory</span>
              <ArrowRight size={14} />
            </button>
          </div>
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
            "From strangers to lifelong best friends 💕"
          </p>

          <button
            onClick={onProceedToDistance}
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
            <span>Across The Distance 🗺️</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
