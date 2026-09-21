import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Sparkles, ArrowRight, ArrowLeft, Maximize2, X, Eye, EyeOff, Baby, Users, Crown, Image as ImageIcon } from 'lucide-react';
import { MASTER_ALBUM_PHOTOS } from '../data/birthdayData';
import { sfx } from '../utils/soundEffects';

export default function MasterPhotoAlbum({ onProceedToMilestones, initialCategory = 'all' }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [lightboxIndex, setLightboxIndex] = useState(null); // null when closed, number when open
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [loveCounts, setLoveCounts] = useState({});
  const [isPeekMode, setIsPeekMode] = useState(false);

  // Filtered photo collection
  const displayedPhotos = activeCategory === 'all'
    ? MASTER_ALBUM_PHOTOS
    : MASTER_ALBUM_PHOTOS.filter(p => p.category === activeCategory);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback((e) => {
    if (lightboxIndex === null) return;

    if (e.key === 'ArrowRight') {
      sfx.playChimeChord();
      setLightboxIndex((prev) => (prev + 1) % displayedPhotos.length);
    } else if (e.key === 'ArrowLeft') {
      sfx.playChimeChord();
      setLightboxIndex((prev) => (prev - 1 + displayedPhotos.length) % displayedPhotos.length);
    } else if (e.key === 'Escape') {
      setLightboxIndex(null);
    }
  }, [lightboxIndex, displayedPhotos.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleOpenLightbox = (index) => {
    sfx.playChimeChord();
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNextPhoto = (e) => {
    e?.stopPropagation();
    sfx.playChimeChord();
    setLightboxIndex((prev) => (prev + 1) % displayedPhotos.length);
  };

  const handlePrevPhoto = (e) => {
    e?.stopPropagation();
    sfx.playChimeChord();
    setLightboxIndex((prev) => (prev - 1 + displayedPhotos.length) % displayedPhotos.length);
  };

  const handleHeartClick = (e, photoId) => {
    e?.stopPropagation();
    sfx.playChimeChord();
    setLoveCounts(prev => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + 1
    }));

    const id = Date.now();
    setFloatingHearts(prev => [...prev, { id, x: Math.random() * 80 - 40 }]);
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== id));
    }, 1200);
  };

  const currentLightboxPhoto = lightboxIndex !== null ? displayedPhotos[lightboxIndex] : null;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Floating hearts animation */}
      {floatingHearts.map((h) => (
        <div
          key={h.id}
          style={{
            position: 'fixed',
            bottom: '90px',
            left: `calc(50% + ${h.x}px)`,
            pointerEvents: 'none',
            zIndex: 1000,
            animation: 'gentleFloat 1.2s ease-out forwards',
            fontSize: '28px'
          }}
        >
          💖
        </div>
      ))}

      {/* Main Glass Card (Translucent so background is visible, with Peek toggle) */}
      <div
        className="glass-card"
        style={{
          maxWidth: '920px',
          width: '96%',
          maxHeight: 'calc(100vh - 130px)',
          padding: 'clamp(1rem, 2.5vw, 1.8rem)',
          borderRadius: '32px',
          background: isPeekMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.86)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '2px solid rgba(251, 207, 232, 0.9)',
          boxShadow: '0 20px 50px rgba(244, 114, 182, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          overflowY: 'auto',
          transition: 'all 0.35s ease',
          opacity: isPeekMode ? 0.2 : 1
        }}
      >
        {/* Top Header Controls Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '6px'
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 16px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #fdf2f8, #fef3c7)',
            border: '1.5px solid #fbcfe8',
            color: '#db2777',
            fontSize: '12px',
            fontWeight: 700
          }}>
            <Sparkles size={14} />
            <span>The Complete Photo Album • 20 Precious Memories 📸</span>
            <Sparkles size={14} />
          </div>

          {/* Peek Toggle Button to look behind the card */}
          <button
            onClick={() => setIsPeekMode(!isPeekMode)}
            style={{
              background: '#ffffff',
              border: '1px solid #fbcfe8',
              borderRadius: '999px',
              padding: '4px 14px',
              color: '#db2777',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(244, 114, 182, 0.18)'
            }}
            title={isPeekMode ? 'Show photo album' : 'Peek at background animations & floating balloons'}
          >
            {isPeekMode ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{isPeekMode ? 'Show Album' : 'Peek Behind'}</span>
          </button>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <h2 className="font-serif" style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
            color: 'var(--color-text-title)',
            fontWeight: 800,
            margin: '0 0 4px 0'
          }}>
            Jashu's Lifetime Memory Album ✨
          </h2>
          <p style={{
            fontSize: 'clamp(0.85rem, 2vw, 0.98rem)',
            color: 'var(--color-secondary)',
            margin: 0
          }}>
            Tap any photo to enlarge and browse effortlessly forward & backward! 💖
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          margin: '6px 0 14px 0',
          flexWrap: 'wrap',
          maxWidth: '100%'
        }}>
          {[
            { id: 'all', label: '🌟 All Memories (20)' },
            { id: 'childhood', label: '🧸 Childhood (10)' },
            { id: 'friendship', label: '👭 Me & Jashu (4)' },
            { id: 'jashu', label: '👑 Jashu Today (5)' },
            { id: 'scrapbook', label: '🎨 Collage Art (1)' }
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sfx.playChimeChord();
                  setActiveCategory(cat.id);
                }}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  border: isActive ? '1.5px solid #db2777' : '1px solid #fbcfe8',
                  background: isActive ? 'linear-gradient(135deg, #f472b6, #db2777)' : '#ffffff',
                  color: isActive ? '#ffffff' : '#6b7280',
                  boxShadow: isActive ? '0 4px 14px rgba(219, 39, 119, 0.3)' : 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Photo Gallery Grid (Responsive, Scrollable, Clean Sizing) */}
        <div style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
          gap: '14px',
          padding: '6px',
          maxHeight: '44vh',
          overflowY: 'auto',
          margin: '4px 0 12px 0'
        }}>
          {displayedPhotos.map((photo, index) => {
            const loveCount = loveCounts[photo.id] || 0;

            return (
              <div
                key={photo.id}
                onClick={() => handleOpenLightbox(index)}
                className="polaroid-card"
                style={{
                  padding: '8px 8px 12px 8px',
                  borderRadius: '16px',
                  background: '#ffffff',
                  border: '1.5px solid #fbcfe8',
                  boxShadow: '0 8px 20px rgba(244, 114, 182, 0.15)',
                  cursor: 'pointer',
                  transform: `rotate(${photo.rotation || '0deg'})`,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                {/* Photo image frame */}
                <div style={{
                  width: '100%',
                  height: '150px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#fdf2f8',
                  position: 'relative',
                  marginBottom: '8px'
                }}>
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.4s ease'
                    }}
                  />
                  {/* Category Tag pill */}
                  <span style={{
                    position: 'absolute',
                    top: '6px',
                    left: '6px',
                    background: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(4px)',
                    color: '#db2777',
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '999px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
                  }}>
                    {photo.tag}
                  </span>

                  {/* Zoom hint overlay icon */}
                  <div style={{
                    position: 'absolute',
                    bottom: '6px',
                    right: '6px',
                    background: 'rgba(0, 0, 0, 0.55)',
                    color: '#ffffff',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Maximize2 size={12} />
                  </div>
                </div>

                {/* Card details */}
                <h4 style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#831843',
                  margin: '0 0 2px 0',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {photo.title}
                </h4>

                <p style={{
                  fontSize: '11px',
                  color: '#6b7280',
                  margin: '0 0 6px 0',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {photo.subtitle}
                </p>

                {/* Love reaction button on card */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 'auto',
                  paddingTop: '4px',
                  borderTop: '1px dashed #fce7f3'
                }}>
                  <span style={{ fontSize: '10px', color: '#db2777', fontWeight: 600 }}>
                    #{index + 1} of {displayedPhotos.length}
                  </span>

                  <button
                    onClick={(e) => handleHeartClick(e, photo.id)}
                    style={{
                      background: '#fdf2f8',
                      border: '1px solid #fbcfe8',
                      borderRadius: '999px',
                      padding: '2px 8px',
                      color: '#db2777',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Heart size={11} fill="#ec4899" />
                    <span>{loveCount}</span>
                  </button>
                </div>
              </div>
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
          gap: '10px',
          paddingTop: '8px',
          borderTop: '1.5px dashed #fbcfe8'
        }}>
          <p className="handwriting-accent" style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.4rem)', color: '#db2777', margin: 0 }}>
            "Every picture holds a timeless piece of our bond 💕"
          </p>

          <button
            onClick={onProceedToMilestones}
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
            <span>Friendship Milestones 🌟</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* =========================================================================
          🌟 THE UNIVERSAL FULL-SCREEN LIGHTBOX MODAL WITH NEXT / PREV BUTTONS!
          ========================================================================= */}
      {lightboxIndex !== null && currentLightboxPhoto && (
        <div
          className="lightbox-backdrop"
          onClick={handleCloseLightbox}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(10px, 3vw, 24px)'
          }}
        >
          {/* Lightbox Card Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-card"
            style={{
              maxWidth: '840px',
              width: '96%',
              maxHeight: '92vh',
              borderRadius: '28px',
              padding: 'clamp(14px, 3vw, 24px)',
              background: 'rgba(255, 255, 255, 0.98)',
              border: '2px solid #fbcfe8',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              overflowY: 'auto'
            }}
          >
            {/* Top Lightbox Header: Index counter & Close button */}
            <div style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  background: 'linear-gradient(135deg, #fdf2f8, #fef3c7)',
                  border: '1px solid #fbcfe8',
                  padding: '3px 12px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#db2777'
                }}>
                  Photo {lightboxIndex + 1} of {displayedPhotos.length}
                </span>

                <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>
                  ({currentLightboxPhoto.categoryLabel})
                </span>
              </div>

              <button
                onClick={handleCloseLightbox}
                style={{
                  background: '#fdf2f8',
                  border: '1px solid #fbcfe8',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#db2777',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(244, 114, 182, 0.2)'
                }}
                title="Close (Esc)"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Image Stage with Next & Prev Buttons */}
            <div style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '6px 0 12px 0'
            }}>
              {/* Previous Photo Button */}
              <button
                onClick={handlePrevPhoto}
                aria-label="Previous Photo"
                style={{
                  position: 'absolute',
                  left: '8px',
                  zIndex: 10,
                  background: 'rgba(255, 255, 255, 0.92)',
                  border: '1.5px solid #fbcfe8',
                  borderRadius: '50%',
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#db2777',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.2s ease'
                }}
                title="Previous Photo (Left Arrow)"
              >
                <ArrowLeft size={20} />
              </button>

              {/* Photo Image Display */}
              <div style={{
                maxWidth: '100%',
                maxHeight: '52vh',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                border: '2px solid #fce7f3'
              }}>
                <img
                  src={currentLightboxPhoto.src}
                  alt={currentLightboxPhoto.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '52vh',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </div>

              {/* Next Photo Button (Direct Access to Next Photo) */}
              <button
                onClick={handleNextPhoto}
                aria-label="Next Photo"
                style={{
                  position: 'absolute',
                  right: '8px',
                  zIndex: 10,
                  background: 'rgba(255, 255, 255, 0.92)',
                  border: '1.5px solid #fbcfe8',
                  borderRadius: '50%',
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#db2777',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.2s ease'
                }}
                title="Next Photo (Right Arrow)"
              >
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Photo Caption & Heartfelt Description */}
            <div style={{ textAlign: 'center', width: '100%', padding: '0 8px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#fdf2f8',
                padding: '3px 12px',
                borderRadius: '999px',
                border: '1px solid #fbcfe8',
                color: '#db2777',
                fontSize: '11px',
                fontWeight: 700,
                marginBottom: '4px'
              }}>
                <Heart size={12} fill="#ec4899" />
                <span>{currentLightboxPhoto.tag}</span>
              </div>

              <h3 className="font-serif" style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.6rem)',
                color: '#831843',
                fontWeight: 800,
                margin: '2px 0 4px 0'
              }}>
                {currentLightboxPhoto.title}
              </h3>

              <p style={{
                fontSize: 'clamp(0.9rem, 2vw, 1.02rem)',
                color: '#4b5563',
                lineHeight: '1.6',
                maxWidth: '640px',
                margin: '0 auto 10px auto'
              }}>
                {currentLightboxPhoto.description}
              </p>

              {/* Navigation Helper Buttons */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginTop: '6px'
              }}>
                <button
                  onClick={handlePrevPhoto}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #fbcfe8',
                    borderRadius: '999px',
                    padding: '6px 16px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#db2777',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <ArrowLeft size={14} />
                  <span>Previous</span>
                </button>

                <button
                  onClick={(e) => handleHeartClick(e, currentLightboxPhoto.id)}
                  style={{
                    background: 'linear-gradient(135deg, #f472b6, #db2777)',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '6px 18px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#ffffff',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(219, 39, 119, 0.3)'
                  }}
                >
                  <Heart size={14} fill="#ffffff" />
                  <span>Love ({loveCounts[currentLightboxPhoto.id] || 0})</span>
                </button>

                <button
                  onClick={handleNextPhoto}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #fbcfe8',
                    borderRadius: '999px',
                    padding: '6px 16px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#db2777',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>Next</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
