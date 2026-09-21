import React, { useState } from 'react';
import { Heart, Sparkles, ArrowRight, ArrowLeft, Maximize2, X, Star, Crown } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import { sfx } from '../utils/soundEffects';

export default function JashuGallery({ onProceedToTimeline }) {
  const { photos } = BIRTHDAY_DATA;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loveCount, setLoveCount] = useState(1);
  const [floatingHearts, setFloatingHearts] = useState([]);

  const currentPhoto = photos[activeIndex];

  const handleNext = () => {
    sfx.playChimeChord();
    setActiveIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    sfx.playChimeChord();
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleSendLove = () => {
    sfx.playChimeChord();
    setLoveCount((prev) => prev + 1);
    const id = Date.now();
    const newHeart = { id, x: Math.random() * 80 - 40 };
    setFloatingHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1200);
  };

  return (
    <section style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.8rem',
      position: 'relative',
      zIndex: 10,
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <div className="glass-card" style={{
        maxWidth: '860px',
        width: '100%',
        maxHeight: '94vh',
        padding: 'clamp(1rem, 3vw, 1.8rem)',
        borderRadius: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.96)',
        boxShadow: '0 20px 50px rgba(244, 114, 182, 0.28)',
        border: '2px solid rgba(251, 207, 232, 0.95)',
        overflowY: 'auto'
      }}>
        {/* Top Header Badge & Love Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '4px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '3px 14px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #fdf2f8, #fef3c7)',
            border: '1.5px solid #fbcfe8',
            color: '#db2777',
            fontSize: '12px',
            fontWeight: 700
          }}>
            <Crown size={14} />
            <span>Radiance & Grace • Jashu Today ✨</span>
            <Sparkles size={13} />
          </div>

          <button
            onClick={handleSendLove}
            style={{
              background: '#fdf2f8',
              border: '1px solid #fbcfe8',
              borderRadius: '999px',
              padding: '4px 14px',
              color: '#db2777',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(244, 114, 182, 0.2)'
            }}
          >
            <Heart size={14} fill="#f472b6" />
            <span>Compliment My Bangaaram ({loveCount})</span>
          </button>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2px' }}>
          <h2 className="font-serif" style={{
            fontSize: 'clamp(1.3rem, 3.2vw, 1.85rem)',
            color: '#831843',
            fontWeight: 700,
            margin: '0 0 2px 0'
          }}>
            Glow of Elegance: Jashu (Bangaaram) Today 💖✨
          </h2>
          <p style={{ fontSize: '11px', color: '#9333ea', fontWeight: 600, margin: 0 }}>
            From the cutest little baby to the most radiant, graceful soul! Truly one in a billion!
          </p>
        </div>

        {/* Central Polaroid Photo Showcase */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(8px, 2.5vw, 20px)',
          width: '100%',
          margin: '4px 0'
        }}>
          {/* Prev Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous Photo"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#ffffff',
              border: '1.5px solid #fbcfe8',
              color: '#db2777',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(244, 114, 182, 0.25)',
              transition: 'transform 0.2s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <ArrowLeft size={16} />
          </button>

          {/* Active Polaroid Card */}
          <div
            onClick={() => setIsZoomed(true)}
            style={{
              position: 'relative',
              background: '#ffffff',
              padding: '8px 8px 12px 8px',
              borderRadius: '16px',
              boxShadow: '0 12px 30px rgba(219, 39, 119, 0.22), 0 2px 8px rgba(0,0,0,0.08)',
              border: '2px solid #fce7f3',
              maxWidth: '310px',
              width: '100%',
              cursor: 'pointer',
              textAlign: 'center',
              animation: 'fadeIn 0.3s ease-out'
            }}
            title="Click to view full screen!"
          >
            {/* Tag Badge */}
            <span style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: 'rgba(219, 39, 119, 0.9)',
              color: '#ffffff',
              fontSize: '10px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '999px',
              backdropFilter: 'blur(4px)',
              zIndex: 2
            }}>
              {currentPhoto.tags[0] || 'Bangaaram'}
            </span>

            {/* Enlarge Hint */}
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '50%',
              width: '26px',
              height: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#db2777',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 2
            }}>
              <Maximize2 size={12} />
            </div>

            {/* Photo Container */}
            <div style={{
              width: '100%',
              height: '225px',
              borderRadius: '10px',
              overflow: 'hidden',
              backgroundColor: '#fce7f3',
              marginBottom: '6px'
            }}>
              <img
                src={currentPhoto.image}
                alt={currentPhoto.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>

            {/* Photo Title & Caption */}
            <h3 className="font-serif" style={{ fontSize: '1.05rem', color: '#831843', fontWeight: 700, margin: '0 0 1px 0' }}>
              {currentPhoto.title}
            </h3>
            <span style={{ fontSize: '11px', color: '#9333ea', fontWeight: 600 }}>
              {currentPhoto.caption} • ({activeIndex + 1} of {photos.length})
            </span>

            {/* Floating Hearts */}
            {floatingHearts.map((h) => (
              <div
                key={h.id}
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: `calc(50% + ${h.x}px)`,
                  fontSize: '22px',
                  pointerEvents: 'none',
                  animation: 'gentleFloat 1.2s ease-out forwards'
                }}
              >
                💖
              </div>
            ))}
          </div>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next Photo"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#ffffff',
              border: '1.5px solid #fbcfe8',
              color: '#db2777',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(244, 114, 182, 0.25)',
              transition: 'transform 0.2s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Caption */}
        <p style={{
          fontSize: '12px',
          color: '#374151',
          maxWidth: '580px',
          textAlign: 'center',
          margin: '2px auto',
          lineHeight: '1.45',
          fontStyle: 'italic'
        }}>
          "{currentPhoto.description}"
        </p>

        {/* Thumbnail Filmstrip (All 5 photos) */}
        <div style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '100%',
          overflowX: 'auto',
          padding: '4px 2px'
        }}>
          {photos.map((p, idx) => {
            const isSel = idx === activeIndex;
            return (
              <button
                key={p.id}
                onClick={() => {
                  sfx.playChimeChord();
                  setActiveIndex(idx);
                }}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: isSel ? '2px solid #db2777' : '1px solid #fbcfe8',
                  transform: isSel ? 'scale(1.12)' : 'scale(1)',
                  boxShadow: isSel ? '0 3px 10px rgba(219, 39, 119, 0.4)' : 'none',
                  cursor: 'pointer',
                  padding: 0,
                  background: '#ffffff',
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }}
                title={p.title}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </button>
            );
          })}
        </div>

        {/* Footer & Next Stage Action */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          paddingTop: '6px',
          borderTop: '1px dashed #fbcfe8'
        }}>
          <p className="handwriting-accent" style={{ fontSize: '1.15rem', color: '#9333ea', margin: 0 }}>
            "No words can describe how proud I am to have you in my life, Bangaaram! 🌸"
          </p>

          <button
            onClick={onProceedToTimeline}
            className="btn-yes"
            style={{
              padding: '8px 18px',
              fontSize: '13px',
              borderRadius: '999px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Friendship Milestones 🌟</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX FOR PHOTO */}
      {isZoomed && (
        <div className="lightbox-backdrop" onClick={() => setIsZoomed(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '92vw',
              maxHeight: '92vh',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff',
              padding: '16px'
            }}
          >
            <button
              onClick={() => setIsZoomed(false)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                zIndex: 20,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.6)',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>

            <img
              src={currentPhoto.image}
              alt={currentPhoto.title}
              style={{
                maxWidth: '85vw',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '12px'
              }}
            />

            <div style={{ marginTop: '12px', textAlign: 'center' }}>
              <h4 className="font-serif" style={{ fontSize: '1.3rem', color: '#831843', margin: 0 }}>
                {currentPhoto.title}
              </h4>
              <p style={{ fontSize: '13px', color: '#4b5563', margin: '4px 0 0 0' }}>
                {currentPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
