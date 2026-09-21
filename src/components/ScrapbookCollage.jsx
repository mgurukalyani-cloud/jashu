import React, { useState } from 'react';
import { Heart, Sparkles, ArrowRight, ArrowLeft, Maximize2, X, Users, Image as ImageIcon } from 'lucide-react';
import { sfx } from '../utils/soundEffects';

const FRIENDSHIP_PHOTOS = [
  {
    id: 'heart-sign',
    title: 'Half Heart + Half Heart = Our Love 🫶',
    caption: 'Best Friends Forever 💕',
    description: 'Two hands making one complete heart. Distance may separate our homes and colleges, but this heart will forever stay complete!',
    src: '/assets/friendship/me-and-jashu-heart-sign.jpg',
    tag: 'Our Heart Sign 🫶'
  },
  {
    id: 'sparkle-selfie',
    title: 'Sparkles & Endless Laughter ✨👑',
    caption: 'Queens of Friendship 💖',
    description: 'Two best friends, endless laughs, and a lifetime of inside jokes! My favorite person to take selfies with!',
    src: '/assets/friendship/me-and-jashu-sparkle-selfie.jpg',
    tag: 'Pure Joy ✨'
  },
  {
    id: 'traditional',
    title: 'Festive Twirls & Golden Days 🌸',
    caption: 'Side by Side Always 💫',
    description: 'Dressed up in festive silk lehengas, sitting together and sharing every little secret. Unbreakable bond!',
    src: '/assets/friendship/me-and-jashu-traditional.jpg',
    tag: 'Festive Glow 🌸'
  },
  {
    id: 'ganesh-pandal',
    title: "Blessings by Bappa's Side 🌺🙏",
    caption: 'Prayers for You 🌟',
    description: 'Standing together in front of the grand Vinayaka pandal, wishing for your eternal happiness, health, and success!',
    src: '/assets/friendship/me-and-jashu-ganesh-pandal.jpg',
    tag: 'Bappa Blessings 🌺'
  }
];

export default function ScrapbookCollage({ onProceedToTimeline }) {
  const [activeTab, setActiveTab] = useState('real'); // 'real' | 'scrapbook'
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loveCount, setLoveCount] = useState(1);
  const [floatingHearts, setFloatingHearts] = useState([]);

  const currentFriendPhoto = FRIENDSHIP_PHOTOS[activePhotoIdx];

  const handleNextPhoto = () => {
    sfx.playChimeChord();
    setActivePhotoIdx((prev) => (prev + 1) % FRIENDSHIP_PHOTOS.length);
  };

  const handlePrevPhoto = () => {
    sfx.playChimeChord();
    setActivePhotoIdx((prev) => (prev - 1 + FRIENDSHIP_PHOTOS.length) % FRIENDSHIP_PHOTOS.length);
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
        maxWidth: '880px',
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
        {/* Header Badge & Love Button */}
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
            <Users size={14} />
            <span>Best Friends Forever: Me & Jashu 💕</span>
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
            <span>Love Our Bond ({loveCount})</span>
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
            Moments with My Bangaaram 👭💖
          </h2>
          <p style={{ fontSize: '11px', color: '#9333ea', fontWeight: 600, margin: 0 }}>
            "Distance may separate our homes and colleges, but it cannot separate our hearts."
          </p>
        </div>

        {/* Tab Toggle: Real Photos vs Scrapbook Artwork */}
        <div style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
          margin: '4px 0'
        }}>
          <button
            onClick={() => {
              sfx.playChimeChord();
              setActiveTab('real');
            }}
            style={{
              padding: '4px 16px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeTab === 'real' ? '1.5px solid #db2777' : '1px solid #fbcfe8',
              background: activeTab === 'real' ? 'linear-gradient(135deg, #f472b6, #db2777)' : '#ffffff',
              color: activeTab === 'real' ? '#ffffff' : '#6b7280',
              boxShadow: activeTab === 'real' ? '0 3px 10px rgba(219, 39, 119, 0.25)' : 'none',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Users size={14} />
            <span>Me & Jashu Together (4) 💕</span>
          </button>

          <button
            onClick={() => {
              sfx.playChimeChord();
              setActiveTab('scrapbook');
            }}
            style={{
              padding: '4px 16px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeTab === 'scrapbook' ? '1.5px solid #db2777' : '1px solid #fbcfe8',
              background: activeTab === 'scrapbook' ? 'linear-gradient(135deg, #f472b6, #db2777)' : '#ffffff',
              color: activeTab === 'scrapbook' ? '#ffffff' : '#6b7280',
              boxShadow: activeTab === 'scrapbook' ? '0 3px 10px rgba(219, 39, 119, 0.25)' : 'none',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ImageIcon size={14} />
            <span>Scrapbook Artwork 🌸</span>
          </button>
        </div>

        {/* TAB 1: REAL PHOTOS OF ME & JASHU */}
        {activeTab === 'real' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            animation: 'fadeIn 0.3s ease-out'
          }}>
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
                onClick={handlePrevPhoto}
                aria-label="Previous Memory"
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
                  {currentFriendPhoto.tag}
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
                    src={currentFriendPhoto.src}
                    alt={currentFriendPhoto.title}
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
                  {currentFriendPhoto.title}
                </h3>
                <span style={{ fontSize: '11px', color: '#9333ea', fontWeight: 600 }}>
                  {currentFriendPhoto.caption} • ({activePhotoIdx + 1} of {FRIENDSHIP_PHOTOS.length})
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
                onClick={handleNextPhoto}
                aria-label="Next Memory"
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

            {/* Description */}
            <p style={{
              fontSize: '12px',
              color: '#374151',
              maxWidth: '580px',
              textAlign: 'center',
              margin: '2px auto',
              lineHeight: '1.45',
              fontStyle: 'italic'
            }}>
              "{currentFriendPhoto.description}"
            </p>

            {/* Thumbnail Filmstrip */}
            <div style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: '100%',
              overflowX: 'auto',
              padding: '4px 2px'
            }}>
              {FRIENDSHIP_PHOTOS.map((p, idx) => {
                const isSel = idx === activePhotoIdx;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      sfx.playChimeChord();
                      setActivePhotoIdx(idx);
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
                      src={p.src}
                      alt={p.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: BEST FRIEND SCRAPBOOK ARTWORK (As in user's original picture!) */}
        {activeTab === 'scrapbook' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            <div
              onClick={() => setIsZoomed(true)}
              style={{
                position: 'relative',
                maxWidth: '620px',
                width: '100%',
                maxHeight: '52vh',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
                cursor: 'pointer',
                border: '3px solid #ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fce7f3',
                margin: '4px 0'
              }}
              title="Click to view full screen!"
            >
              <img
                src="/assets/scrapbook-collage.png"
                alt="Best Friend Memories Scrapbook Collage"
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '52vh',
                  objectFit: 'contain'
                }}
              />

              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(4px)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#db2777',
                boxShadow: '0 2px 10px rgba(0,0,0,0.15)'
              }}>
                <Maximize2 size={15} />
              </div>
            </div>

            <p style={{
              fontSize: '12px',
              color: '#374151',
              maxWidth: '580px',
              textAlign: 'center',
              margin: '4px auto 0 auto',
              fontStyle: 'italic'
            }}>
              "The sweetest scrapbook collage crafted with love for my dearest Jashu!"
            </p>
          </div>
        )}

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
            "Distance cannot change a bond this special. Forever my Bujji! 💕"
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
            <span>Jashu's Radiance & Grace ✨</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX FOR PHOTO / SCRAPBOOK */}
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
              src={activeTab === 'real' ? currentFriendPhoto.src : '/assets/scrapbook-collage.png'}
              alt="Enlarged Memory"
              style={{
                maxWidth: '85vw',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '12px'
              }}
            />

            {activeTab === 'real' && (
              <div style={{ marginTop: '12px', textAlign: 'center' }}>
                <h4 className="font-serif" style={{ fontSize: '1.3rem', color: '#831843', margin: 0 }}>
                  {currentFriendPhoto.title}
                </h4>
                <p style={{ fontSize: '13px', color: '#4b5563', margin: '4px 0 0 0' }}>
                  {currentFriendPhoto.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
