import React, { useState } from 'react';
import { Heart, Star, Mail, X, Sparkles } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import { sfx } from '../utils/soundEffects';

export default function SecretMessage() {
  const [activeSecret, setActiveSecret] = useState(null);
  const { secretMessages } = BIRTHDAY_DATA;

  const openSecret = (item) => {
    sfx.playChimeChord();
    setActiveSecret(item);
  };

  const closeSecret = () => {
    setActiveSecret(null);
  };

  return (
    <>
      {/* Floating Secret Triggers Section */}
      <div style={{
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--color-primary)',
          fontSize: '12px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '14px'
        }}>
          <Sparkles size={14} />
          <span>Hidden Easter Eggs</span>
          <Sparkles size={14} />
        </div>

        <p style={{
          fontSize: '14px',
          color: 'var(--color-text-muted)',
          marginBottom: '18px',
          textAlign: 'center'
        }}>
          Psst... three secret whisper messages are hidden here. Click to uncover! 🤫✨
        </p>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {secretMessages.map((sec) => (
            <button
              key={sec.id}
              onClick={() => openSecret(sec)}
              className="glass-card"
              style={{
                padding: '10px 18px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                border: '1.5px solid #fbcfe8',
                color: '#db2777',
                fontSize: '13px',
                fontWeight: 600,
                boxShadow: '0 4px 15px rgba(244, 114, 182, 0.15)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {sec.type === 'heart' && <Heart size={16} fill="#f472b6" />}
              {sec.type === 'star' && <Star size={16} fill="#fde047" color="#f59e0b" />}
              {sec.type === 'envelope' && <Mail size={16} color="#9333ea" />}
              <span>{sec.hint}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Secret Message Popup Modal */}
      {activeSecret && (
        <div className="lightbox-backdrop" onClick={closeSecret}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-card"
            style={{
              maxWidth: '480px',
              width: '90%',
              padding: '2.2rem 2rem',
              borderRadius: '28px',
              textAlign: 'center',
              position: 'relative',
              background: '#ffffff',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              border: '2px solid #fbcfe8',
              animation: 'fadeIn 0.25s ease-out'
            }}
          >
            <button
              onClick={closeSecret}
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

            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #fce7f3, #fdf2f8)',
              margin: '0 auto 16px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#db2777',
              boxShadow: '0 6px 16px rgba(244, 114, 182, 0.2)'
            }}>
              {activeSecret.type === 'heart' && <Heart size={28} fill="#f472b6" />}
              {activeSecret.type === 'star' && <Star size={28} fill="#fde047" color="#f59e0b" />}
              {activeSecret.type === 'envelope' && <Mail size={28} color="#9333ea" />}
            </div>

            <h4 className="font-serif" style={{ fontSize: '1.4rem', color: '#831843', marginBottom: '12px', fontWeight: 700 }}>
              A Whisper For Bujji 💌
            </h4>

            <p style={{
              fontSize: '15px',
              color: '#374151',
              lineHeight: '1.7',
              fontStyle: 'italic',
              margin: '0 0 20px 0'
            }}>
              "{activeSecret.message}"
            </p>

            <button
              onClick={closeSecret}
              className="btn-yes"
              style={{
                padding: '10px 24px',
                fontSize: '14px',
                borderRadius: '999px',
                cursor: 'pointer'
              }}
            >
              <span>Keep Secret In Heart 💖</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
