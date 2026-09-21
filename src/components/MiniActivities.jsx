import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Heart, RefreshCw, Star, Mail, X, ArrowRight } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import { sfx } from '../utils/soundEffects';

export default function MiniActivities({ onProceedToCelebration }) {
  const { scratchCard, secretMessages } = BIRTHDAY_DATA;
  const [activeTab, setActiveTab] = useState('scratch'); // 'scratch' | 'hearts' | 'secrets'
  const canvasRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const [heartsPopped, setHeartsPopped] = useState([]);
  const [complimentToast, setComplimentToast] = useState(null);
  const [activeSecret, setActiveSecret] = useState(null);

  const compliments = [
    "Your smile illuminates everything! ✨",
    "Best friend anyone could ever ask for! 💖",
    "So proud of how hardworking you are! 🌸",
    "Forever grateful for our endless talks! 💫",
    "May all your birthday dreams come true, Bujji! 🎂"
  ];

  // Initialize Canvas Scratch Card
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#fde68a');
    grad.addColorStop(0.5, '#f59e0b');
    grad.addColorStop(1, '#d97706');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 14px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch Here With Mouse or Finger ✨', width / 2, height / 2);

    setIsScratched(false);
  };

  useEffect(() => {
    if (activeTab === 'scratch') {
      setTimeout(initCanvas, 50);
    }
  }, [activeTab]);

  const scratch = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    if (Math.random() > 0.6) {
      checkScratched();
    }
  };

  const checkScratched = () => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    const total = imageData.data.length;

    for (let i = 3; i < total; i += 32) {
      if (imageData.data[i] === 0) {
        transparentPixels++;
      }
    }

    if (transparentPixels / (total / 32) > 0.42) {
      setIsScratched(true);
      sfx.playChimeChord();
    }
  };

  const popHeart = (index) => {
    sfx.playChimeChord();
    setHeartsPopped(prev => [...prev, index]);
    const message = compliments[index % compliments.length];
    setComplimentToast(message);
    setTimeout(() => {
      setComplimentToast(null);
    }, 2800);
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
      {/* Toast popup */}
      {complimentToast && (
        <div style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          background: 'linear-gradient(135deg, #ec4899, #db2777)',
          color: '#ffffff',
          padding: '10px 24px',
          borderRadius: '999px',
          boxShadow: '0 10px 30px rgba(236, 72, 153, 0.4)',
          fontSize: '13px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <Heart size={16} fill="#ffffff" />
          <span>{complimentToast}</span>
        </div>
      )}

      <div className="glass-card" style={{
        maxWidth: '820px',
        width: '100%',
        maxHeight: 'calc(100vh - 138px)',
        padding: 'clamp(1.2rem, 3.5vw, 2.2rem)',
        borderRadius: '32px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.85)',
        border: '2px solid rgba(251, 207, 232, 0.95)',
        boxShadow: '0 20px 50px rgba(244, 114, 182, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflowY: 'auto'
      }}>
        {/* Header */}
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
            marginBottom: '6px',
            padding: '4px 16px',
            borderRadius: '999px',
            background: '#fdf2f8',
            border: '1px solid #fbcfe8'
          }}>
            <Sparkles size={14} />
            <span>Interactive Joy Corner</span>
            <Sparkles size={14} />
          </div>

          <h2 className="font-serif" style={{
            fontSize: 'clamp(1.5rem, 3.8vw, 2.2rem)',
            color: '#831843',
            fontWeight: 700,
            margin: '0 0 4px 0'
          }}>
            Little Joy Surprises for Bujji 🪄💖
          </h2>
        </div>

        {/* Activity Tab Buttons */}
        <div style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          margin: '10px 0'
        }}>
          {[
            { id: 'scratch', label: 'Golden Scratch Card ✨' },
            { id: 'hearts', label: 'Pop The Heart 💖' },
            { id: 'secrets', label: 'Secret Whispers 🤫' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sfx.playChimeChord();
                  setActiveTab(tab.id);
                }}
                style={{
                  padding: '7px 18px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: isActive ? '2px solid #db2777' : '1px solid #fbcfe8',
                  background: isActive ? 'linear-gradient(135deg, #f472b6, #db2777)' : '#ffffff',
                  color: isActive ? '#ffffff' : '#6b7280',
                  boxShadow: isActive ? '0 4px 14px rgba(219, 39, 119, 0.25)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: SCRATCH CARD */}
        {activeTab === 'scratch' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: 'fadeIn 0.3s ease-out',
            margin: '6px 0'
          }}>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '10px' }}>
              Rub the golden card to reveal a secret birthday message!
            </p>

            <div style={{
              position: 'relative',
              width: '300px',
              height: '140px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              backgroundColor: '#fff1f2'
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: '#be185d',
                fontSize: '13px',
                fontWeight: 700,
                lineHeight: '1.5'
              }}>
                {scratchCard.hiddenWish}
              </div>

              <canvas
                ref={canvasRef}
                width={300}
                height={140}
                onMouseMove={(e) => e.buttons === 1 && scratch(e.clientX, e.clientY)}
                onTouchMove={(e) => e.touches.length > 0 && scratch(e.touches[0].clientX, e.touches[0].clientY)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  cursor: 'crosshair',
                  touchAction: 'none'
                }}
              />
            </div>

            <button
              onClick={initCanvas}
              style={{
                marginTop: '12px',
                background: 'none',
                border: '1px solid #fbcfe8',
                borderRadius: '999px',
                padding: '4px 14px',
                fontSize: '12px',
                color: '#db2777',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <RefreshCw size={12} />
              <span>Scratch Again</span>
            </button>
          </div>
        )}

        {/* TAB 2: POP THE HEART */}
        {activeTab === 'hearts' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: 'fadeIn 0.3s ease-out',
            margin: '6px 0'
          }}>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '14px' }}>
              Tap any dancing heart to unlock sweet compliments!
            </p>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[0, 1, 2, 3, 4].map(idx => (
                <button
                  key={idx}
                  onClick={() => popHeart(idx)}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: heartsPopped.includes(idx) ? '#fdf2f8' : 'linear-gradient(135deg, #f472b6, #ec4899)',
                    border: '2px solid #fbcfe8',
                    color: heartsPopped.includes(idx) ? '#ec4899' : '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 16px rgba(244, 114, 182, 0.3)',
                    animation: `gentleFloat ${2.2 + idx * 0.3}s infinite alternate`,
                    transition: 'all 0.2s ease'
                  }}
                  title="Tap me!"
                >
                  <Heart size={20} fill={heartsPopped.includes(idx) ? '#f472b6' : '#ffffff'} />
                </button>
              ))}
            </div>

            <div style={{ marginTop: '14px', fontSize: '12px', color: '#9333ea', fontWeight: 600 }}>
              ✨ {heartsPopped.length} / 5 compliments unlocked
            </div>
          </div>
        )}

        {/* TAB 3: SECRET WHISPERS */}
        {activeTab === 'secrets' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: 'fadeIn 0.3s ease-out',
            margin: '6px 0'
          }}>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '14px' }}>
              Three secret whisper messages are hidden here for Bujji. Click to uncover!
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {secretMessages.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    sfx.playChimeChord();
                    setActiveSecret(sec);
                  }}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    border: '1.5px solid #fbcfe8',
                    background: '#ffffff',
                    color: '#db2777',
                    fontSize: '13px',
                    fontWeight: 700,
                    boxShadow: '0 4px 14px rgba(244, 114, 182, 0.15)'
                  }}
                >
                  {sec.type === 'heart' && <Heart size={15} fill="#f472b6" />}
                  {sec.type === 'star' && <Star size={15} fill="#fde047" color="#f59e0b" />}
                  {sec.type === 'envelope' && <Mail size={15} color="#9333ea" />}
                  <span>{sec.hint}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Secret Modal */}
        {activeSecret && (
          <div className="lightbox-backdrop" onClick={() => setActiveSecret(null)}>
            <div
              onClick={(e) => e.stopPropagation()}
              className="glass-card"
              style={{
                maxWidth: '460px',
                width: '90%',
                padding: '2rem 1.8rem',
                borderRadius: '28px',
                textAlign: 'center',
                position: 'relative',
                background: '#ffffff',
                boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                border: '2px solid #fbcfe8'
              }}
            >
              <button
                onClick={() => setActiveSecret(null)}
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#9ca3af'
                }}
              >
                <X size={20} />
              </button>

              <h4 className="font-serif" style={{ fontSize: '1.3rem', color: '#831843', marginBottom: '10px', fontWeight: 700 }}>
                A Whisper For Bujji 💌
              </h4>

              <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.7', fontStyle: 'italic', margin: '0 0 16px 0' }}>
                "{activeSecret.message}"
              </p>

              <button
                onClick={() => setActiveSecret(null)}
                className="btn-yes"
                style={{ padding: '8px 22px', fontSize: '13px', borderRadius: '999px', cursor: 'pointer' }}
              >
                <span>Keep Secret In Heart 💖</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer & Next Stage Action */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          paddingTop: '8px',
          borderTop: '1px dashed #fbcfe8'
        }}>
          <p className="handwriting-accent" style={{ fontSize: '1.25rem', color: '#9333ea', margin: 0 }}>
            "Bringing a smile to your face is my favorite mission! 😊"
          </p>

          <button
            onClick={onProceedToCelebration}
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
            <span>The Grand Celebration 🎉</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
