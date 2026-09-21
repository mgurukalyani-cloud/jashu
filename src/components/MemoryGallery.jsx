import React, { useState, useEffect } from 'react';
import { Heart, Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import { sfx } from '../utils/soundEffects';

export default function MemoryGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [likes, setLikes] = useState({});
  const [floatingHeartEffect, setFloatingHeartEffect] = useState(null);

  const { photos } = BIRTHDAY_DATA;

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowRight') setSelectedPhotoIndex((prev) => (prev + 1) % photos.length);
      if (e.key === 'ArrowLeft') setSelectedPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, photos.length]);

  const handleLike = (e, id) => {
    e.stopPropagation();
    sfx.playChimeChord();
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setFloatingHeartEffect(id);
    setTimeout(() => setFloatingHeartEffect(null), 1000);
  };

  const selectedPhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  return (
    <section style={{
      padding: '4rem 1.5rem',
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10
    }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--color-primary)',
          fontSize: '13px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '10px'
        }}>
          <Sparkles size={16} />
          <span>Our Scrapbook</span>
          <Sparkles size={16} />
        </div>

        <h2 className="font-serif" style={{
          fontSize: 'clamp(2rem, 4.5vw, 3rem)',
          color: 'var(--color-text-title)',
          fontWeight: 700,
          marginBottom: '12px'
        }}>
          Cherished Memories with Bujji 📸💖
        </h2>

        <p style={{
          fontSize: '15px',
          color: 'var(--color-secondary)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Polaroids of laughter, long-distance bond, and unforgettable moments. Tap any card to view enlarged or send a heart!
        </p>
      </div>

      {/* Polaroid Grid with Scrapbook Rotations */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '28px',
        alignItems: 'start'
      }}>
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="polaroid-card"
            onClick={() => setSelectedPhotoIndex(index)}
            style={{
              transform: `rotate(${photo.rotation || '0deg'})`,
            }}
          >
            {/* Polaroid Image */}
            <div style={{
              width: '100%',
              height: '240px',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#fce7f3',
              position: 'relative'
            }}>
              <img
                src={photo.image}
                alt={photo.caption}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease'
                }}
              />

              {/* Enlarge Hint */}
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(4px)',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#db2777'
              }}>
                <Maximize2 size={15} />
              </div>

              {/* Floating Heart Effect */}
              {floatingHeartEffect === photo.id && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'gentleFloat 1s ease-out forwards',
                  pointerEvents: 'none'
                }}>
                  <Heart size={64} fill="#f43f5e" color="#f43f5e" />
                </div>
              )}
            </div>

            {/* Polaroid Caption Area */}
            <div style={{ paddingTop: '14px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <h4 className="font-script" style={{
                  fontSize: '1.45rem',
                  color: 'var(--color-text-title)',
                  margin: 0,
                  lineHeight: 1.1
                }}>
                  {photo.caption}
                </h4>

                {/* Heart Reaction Button */}
                <button
                  onClick={(e) => handleLike(e, photo.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: likes[photo.id] ? '#db2777' : '#9ca3af',
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '2px 6px',
                    borderRadius: '999px',
                    transition: 'all 0.2s ease'
                  }}
                  title="Send love to this memory!"
                >
                  <Heart size={16} fill={likes[photo.id] ? '#f472b6' : 'none'} />
                  {likes[photo.id] ? <span>{likes[photo.id]}</span> : null}
                </button>
              </div>

              <p style={{
                fontSize: '12px',
                color: 'var(--color-text-muted)',
                lineHeight: '1.45',
                marginBottom: '8px'
              }}>
                {photo.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-secondary)', fontWeight: 500 }}>
                  {photo.date}
                </span>

                <div style={{ display: 'flex', gap: '4px' }}>
                  {photo.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '10px',
                        padding: '1px 6px',
                        borderRadius: '999px',
                        background: '#fdf2f8',
                        color: '#db2777'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div className="lightbox-backdrop" onClick={() => setSelectedPhotoIndex(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '900px',
              width: '100%',
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 20,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '16px',
                transform: 'translateY(-50%)',
                zIndex: 20,
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#374151',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
              aria-label="Previous Photo"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhotoIndex((prev) => (prev + 1) % photos.length);
              }}
              style={{
                position: 'absolute',
                top: '50%',
                right: '16px',
                transform: 'translateY(-50%)',
                zIndex: 20,
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#374151',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
              aria-label="Next Photo"
            >
              <ChevronRight size={24} />
            </button>

            {/* Enlarged Photo Container */}
            <div style={{
              width: '100%',
              maxHeight: '65vh',
              backgroundColor: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.caption}
                style={{
                  maxWidth: '100%',
                  maxHeight: '65vh',
                  objectFit: 'contain'
                }}
              />
            </div>

            {/* Lightbox Details */}
            <div style={{ padding: '20px 26px', backgroundColor: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#831843', fontWeight: 700, margin: 0 }}>
                  {selectedPhoto.caption}
                </h3>
                <span style={{ fontSize: '12px', color: '#9333ea', fontWeight: 600 }}>
                  {selectedPhotoIndex + 1} / {photos.length}
                </span>
              </div>

              <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: '1.6', margin: '4px 0 12px 0' }}>
                {selectedPhoto.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#db2777', fontSize: '13px' }}>
                <Heart size={15} fill="#f472b6" />
                <span>Saved with love for Bujji</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
