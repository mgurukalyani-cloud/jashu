import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, RotateCcw, Clock, PartyPopper, Send, MessageCircle, Phone, Copy, Check, Eye, EyeOff, Star } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import { triggerCelebrationConfetti, triggerFireworksShower } from '../utils/confetti';
import { sfx } from '../utils/soundEffects';
import { asset } from '../utils/assetHelper';
import PandaBear from './PandaBear';

export default function FinalCelebration({ onReplayJourney }) {
  const [activeTab, setActiveTab] = useState('celebrate'); // 'celebrate' | 'feedback'
  const [celebrationFired, setCelebrationFired] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: false });
  const [isPeekMode, setIsPeekMode] = useState(false);

  // Rating & Feedback State
  const [rating, setRating] = useState(5); // 1 to 5 hearts
  const [selectedFeelings, setSelectedFeelings] = useState(['tears', 'smiling', 'letter']);
  const [customNote, setCustomNote] = useState('');
  const [targetPhone, setTargetPhone] = useState(BIRTHDAY_DATA.feedback?.mobileNumber || '+919876543210');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Rating labels
  const RATING_DESCRIPTIONS = {
    1: 'A sweet gesture 😊',
    2: 'Brought a warm smile 🥰',
    3: 'Loved it so much! 💖',
    4: 'Touched my heart deeply 🥹💕',
    5: 'BEST SURPRISE EVER! Crying happy tears! 😭🎉❤️'
  };

  // Calculate live countdown to September 22, 2026 at 10:45 AM
  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const target = BIRTHDAY_DATA.birthdayDate;
      const isToday = now.getFullYear() === target.getFullYear() &&
                      now.getMonth() === target.getMonth() &&
                      now.getDate() === target.getDate();

      const diff = target.getTime() - now.getTime();
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
          isToday
        });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true });
      }
    };

    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCelebrateAgain = () => {
    sfx.playChimeChord();
    triggerCelebrationConfetti();
    triggerFireworksShower(4000);
    setCelebrationFired(true);
    setTimeout(() => setCelebrationFired(false), 4500);
  };

  const toggleFeeling = (id) => {
    sfx.playChimeChord();
    setSelectedFeelings(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // Build formatted text message for WhatsApp & SMS
  const generateFeedbackText = () => {
    const feelingLabels = (BIRTHDAY_DATA.feedback?.feelingOptions || [])
      .filter(f => selectedFeelings.includes(f.id))
      .map(f => `${f.emoji} ${f.label}`)
      .join(', ');

    return `🎂 JASHMITHA'S BIRTHDAY SURPRISE RATING 💕
════════════════════════════
💖 Rating: ${rating} / 5 Hearts
👉 Feeling: "${RATING_DESCRIPTIONS[rating]}"
🌸 Highlights: ${feelingLabels || 'All of it!'}
${customNote.trim() ? `\n💌 Personal Message from Jashu:\n"${customNote.trim()}"` : ''}
════════════════════════════
Sent with all my love for my best friend! 🥰💖`;
  };

  const getCleanPhoneNumber = () => {
    return targetPhone.replace(/[^0-9+]/g, '').replace('+', '');
  };

  const handleSendWhatsApp = () => {
    sfx.playChimeChord();
    triggerCelebrationConfetti();
    setFeedbackSubmitted(true);
    const cleanNumber = getCleanPhoneNumber();
    const text = encodeURIComponent(generateFeedbackText());
    const url = cleanNumber
      ? `https://wa.me/${cleanNumber}?text=${text}`
      : `https://api.whatsapp.com/send?text=${text}`;
    window.open(url, '_blank');
  };

  const handleSendSMS = () => {
    sfx.playChimeChord();
    triggerCelebrationConfetti();
    setFeedbackSubmitted(true);
    const cleanNumber = getCleanPhoneNumber();
    const text = encodeURIComponent(generateFeedbackText());
    const url = `sms:${cleanNumber}?body=${text}`;
    window.location.href = url;
  };

  const handleCopyFeedback = () => {
    sfx.playChimeChord();
    navigator.clipboard.writeText(generateFeedbackText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

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
      <div
        className="glass-card"
        style={{
          maxWidth: '880px',
          width: '94%',
          maxHeight: 'calc(100vh - 130px)',
          padding: 'clamp(1.2rem, 3.2vw, 2.2rem)',
          borderRadius: '36px',
          border: '2px solid rgba(251, 207, 232, 0.95)',
          boxShadow: '0 25px 60px rgba(244, 114, 182, 0.3)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: isPeekMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.86)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          overflowY: 'auto',
          transition: 'all 0.35s ease',
          opacity: isPeekMode ? 0.2 : 1
        }}
      >
        {/* Top Controls Bar with Tab Switcher & Peek Background Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '8px'
        }}>
          {/* Tab Switcher */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: '#fdf2f8',
            padding: '3px',
            borderRadius: '999px',
            border: '1.5px solid #fbcfe8'
          }}>
            <button
              onClick={() => { sfx.playChimeChord(); setActiveTab('celebrate'); }}
              style={{
                background: activeTab === 'celebrate' ? 'linear-gradient(135deg, #f472b6, #db2777)' : 'transparent',
                color: activeTab === 'celebrate' ? '#ffffff' : '#db2777',
                border: 'none',
                borderRadius: '999px',
                padding: '5px 14px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>🎉 Celebration</span>
            </button>

            <button
              onClick={() => { sfx.playChimeChord(); setActiveTab('feedback'); }}
              style={{
                background: activeTab === 'feedback' ? 'linear-gradient(135deg, #f472b6, #db2777)' : 'transparent',
                color: activeTab === 'feedback' ? '#ffffff' : '#db2777',
                border: 'none',
                borderRadius: '999px',
                padding: '5px 14px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>💌 Rate & Send Feedback</span>
            </button>
          </div>

          {/* Peek Toggle Button to see behind the card */}
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
            title={isPeekMode ? 'Show card content' : 'Peek at background animations & balloons'}
          >
            {isPeekMode ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{isPeekMode ? 'Show Card' : 'Peek Behind'}</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: GRAND CELEBRATION STAGE
            ========================================================================= */}
        {activeTab === 'celebrate' && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 0.35s ease-out' }}>
            {/* Celebratory Headings */}
            <div style={{ textAlign: 'center', margin: '4px 0' }}>
              <h1 className="font-serif" style={{
                fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
                color: '#831843',
                margin: '0 0 2px 0',
                fontWeight: 800,
                lineHeight: 1.25,
                textShadow: '0 2px 10px rgba(244, 114, 182, 0.25)'
              }}>
                🎂 Happy Birthday, My Dearest Bujji! 💖
              </h1>

              <p className="handwriting-accent" style={{
                fontSize: 'clamp(1.25rem, 2.8vw, 1.65rem)',
                color: '#9333ea',
                margin: 0
              }}>
                🎂 Today is your birthday, Bujji! Let's celebrate! 💕
              </p>
            </div>

            {/* Centerpiece: Sparkler Heart Fireworks Image, Polaroids & Mascot */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(10px, 2.5vw, 24px)',
              margin: '6px 0',
              flexWrap: 'wrap'
            }}>
              {/* Heart Fireworks Image */}
              <div style={{
                position: 'relative',
                maxWidth: '210px',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 10px 24px rgba(219, 39, 119, 0.3)',
                border: '2px solid #fde047',
                animation: 'gentleFloat 3.5s ease-in-out infinite'
              }}>
                <img
                  src={asset('assets/heart-fireworks.png')}
                  alt="Heart Fireworks Bouquet"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '145px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>

              {/* Best Friends Forever Photo: Me & Jashu Heart Sign */}
              <div style={{
                position: 'relative',
                background: '#ffffff',
                padding: '6px 6px 8px 6px',
                borderRadius: '16px',
                boxShadow: '0 10px 24px rgba(219, 39, 119, 0.25)',
                border: '2px solid #fbcfe8',
                maxWidth: '135px',
                textAlign: 'center',
                animation: 'gentleFloat 3.8s ease-in-out infinite alternate',
                animationDelay: '0.4s'
              }}>
                <div style={{
                  width: '100%',
                  height: '105px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundColor: '#fce7f3',
                  marginBottom: '3px'
                }}>
                  <img
                    src={asset('assets/friendship/me-and-jashu-heart-sign.jpg')}
                    alt="Me & Jashu Heart Sign"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#db2777' }}>
                  Me & Jashu 🫶
                </span>
              </div>

              {/* Smiling Happy Panda */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <PandaBear isSmiling={true} size={115} />
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#db2777',
                  background: '#fdf2f8',
                  padding: '2px 10px',
                  borderRadius: '999px',
                  border: '1px solid #fbcfe8',
                  marginTop: '-3px'
                }}>
                  Bujji's Happy Bear 💖
                </span>
              </div>
            </div>

            {/* Emotional Message */}
            <p style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.02rem)',
              color: '#374151',
              lineHeight: '1.6',
              maxWidth: '680px',
              textAlign: 'center',
              margin: '4px auto'
            }}>
              Born at <strong>10:45 AM on September 22nd</strong>, you are the most precious friend in my life, <strong>Jashu (Bangaaram)</strong>.
              May every wish of yours come true, and may our friendship stay golden across any distance! 🌸✨
            </p>

            {/* Live Birthday Countdown / Arrival Box */}
            <div style={{
              background: 'linear-gradient(135deg, #fdf2f8, #faf5ff)',
              border: '1.5px solid #fbcfe8',
              borderRadius: '20px',
              padding: '8px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              margin: '4px 0',
              flexWrap: 'wrap',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(244, 114, 182, 0.12)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b45309', fontSize: '12px', fontWeight: 700 }}>
                <Clock size={15} />
                <span>Sept 22 • 10:45 AM</span>
              </div>
              <div style={{ color: '#db2777', fontSize: '13px', fontWeight: 700 }}>
                {countdown.isToday ? (
                  <span>✨ Today is your blessed day, Jashu! ✨</span>
                ) : (
                  <span>⏳ {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s remaining!</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              marginTop: '6px'
            }}>
              {/* Go to Rating & Feedback */}
              <button
                onClick={() => { sfx.playChimeChord(); setActiveTab('feedback'); }}
                className="btn-yes btn-yes-super-pulse"
                style={{
                  padding: '10px 24px',
                  fontSize: '14px',
                  borderRadius: '999px',
                  cursor: 'pointer'
                }}
              >
                <Heart size={16} fill="#ffffff" />
                <span>Rate This Surprise & Send Feedback 💌</span>
              </button>

              {/* Celebrate Again */}
              <button
                onClick={handleCelebrateAgain}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #fbcfe8',
                  borderRadius: '999px',
                  padding: '10px 20px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#db2777',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(244, 114, 182, 0.15)'
                }}
              >
                <PartyPopper size={15} />
                <span>Blast Fireworks! 🎉</span>
              </button>

              {/* Replay */}
              <button
                onClick={onReplayJourney}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #c084fc',
                  borderRadius: '999px',
                  padding: '10px 20px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#9333ea',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(168, 85, 247, 0.15)'
                }}
              >
                <RotateCcw size={14} />
                <span>Replay All ↺</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: INTERACTIVE RATING & SEND FEEDBACK TO MOBILE NUMBER
            ========================================================================= */}
        {activeTab === 'feedback' && (
          <div style={{
            width: '100%',
            maxWidth: '680px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: 'fadeIn 0.35s ease-out',
            textAlign: 'center'
          }}>
            <h2 className="font-serif" style={{
              fontSize: 'clamp(1.4rem, 3.5vw, 2.1rem)',
              color: '#831843',
              fontWeight: 800,
              margin: '0 0 4px 0'
            }}>
              How Did This Surprise Feel, Jashu? 💖
            </h2>

            <p style={{
              fontSize: 'clamp(0.85rem, 2vw, 0.98rem)',
              color: 'var(--color-secondary)',
              margin: '0 0 12px 0'
            }}>
              Your genuine feeling is the most treasured birthday gift to me!
            </p>

            {/* 1. 5-Heart Interactive Rating */}
            <div style={{
              background: 'linear-gradient(135deg, #fff5f7, #faf5ff)',
              padding: '12px 20px',
              borderRadius: '24px',
              border: '1.5px solid #fbcfe8',
              width: '100%',
              marginBottom: '10px',
              boxShadow: '0 4px 16px rgba(244, 114, 182, 0.12)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '6px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => {
                      sfx.playChimeChord();
                      setRating(star);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transform: rating >= star ? 'scale(1.2)' : 'scale(1)',
                      transition: 'all 0.2s ease',
                      padding: '4px'
                    }}
                    title={`${star} Hearts`}
                  >
                    <Heart
                      size={32}
                      fill={rating >= star ? '#db2777' : '#fce7f3'}
                      color={rating >= star ? '#be185d' : '#f472b6'}
                      style={{ filter: rating >= star ? 'drop-shadow(0 2px 8px rgba(219, 39, 119, 0.45))' : 'none' }}
                    />
                  </button>
                ))}
              </div>

              <span style={{
                display: 'inline-block',
                background: '#ffffff',
                border: '1px solid #fbcfe8',
                padding: '3px 14px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 700,
                color: '#db2777'
              }}>
                {RATING_DESCRIPTIONS[rating]}
              </span>
            </div>

            {/* 2. Feeling Tags Selector */}
            <div style={{ width: '100%', marginBottom: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#831843', display: 'block', marginBottom: '6px' }}>
                Select what you felt the most:
              </span>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                {(BIRTHDAY_DATA.feedback?.feelingOptions || []).map((feeling) => {
                  const isSelected = selectedFeelings.includes(feeling.id);
                  return (
                    <button
                      key={feeling.id}
                      onClick={() => toggleFeeling(feeling.id)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        border: isSelected ? '1.5px solid #db2777' : '1px solid #fbcfe8',
                        background: isSelected ? 'linear-gradient(135deg, #f472b6, #db2777)' : '#ffffff',
                        color: isSelected ? '#ffffff' : '#4b5563',
                        boxShadow: isSelected ? '0 2px 8px rgba(219, 39, 119, 0.25)' : 'none'
                      }}
                    >
                      <span>{feeling.emoji} {feeling.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Personal Message Textarea */}
            <div style={{ width: '100%', marginBottom: '10px' }}>
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Write any sweet words, funny reply, or message for me here, Bangaaram... 💕"
                rows={2}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '16px',
                  border: '1.5px solid #fbcfe8',
                  background: 'rgba(255, 255, 255, 0.95)',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  color: '#374151',
                  resize: 'none',
                  outline: 'none',
                  boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.04)'
                }}
              />
            </div>

            {/* 4. Target Mobile Number Field (Configurable / Editable) */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#fdf2f8',
              border: '1px solid #fbcfe8',
              padding: '4px 12px',
              borderRadius: '999px',
              fontSize: '12px',
              color: '#831843',
              marginBottom: '12px'
            }}>
              <Phone size={13} color="#db2777" />
              <span>Sending to:</span>
              {isEditingPhone ? (
                <input
                  type="text"
                  value={targetPhone}
                  onChange={(e) => setTargetPhone(e.target.value)}
                  onBlur={() => setIsEditingPhone(false)}
                  autoFocus
                  style={{
                    border: '1px solid #db2777',
                    borderRadius: '6px',
                    padding: '1px 6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#db2777',
                    width: '125px',
                    outline: 'none'
                  }}
                />
              ) : (
                <strong
                  onClick={() => setIsEditingPhone(true)}
                  style={{ color: '#db2777', cursor: 'pointer', textDecoration: 'underline' }}
                  title="Click to edit mobile number"
                >
                  {targetPhone} ✏️
                </strong>
              )}
            </div>

            {/* 5. Send Feedback Action Buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '6px'
            }}>
              {/* WhatsApp Button */}
              <button
                onClick={handleSendWhatsApp}
                className="btn-yes btn-yes-super-pulse"
                style={{
                  padding: '10px 22px',
                  fontSize: '13px',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  boxShadow: '0 6px 18px rgba(37, 211, 102, 0.35)'
                }}
              >
                <MessageCircle size={16} />
                <span>Send via WhatsApp 💬</span>
              </button>

              {/* SMS Button */}
              <button
                onClick={handleSendSMS}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #fbcfe8',
                  borderRadius: '999px',
                  padding: '10px 18px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#db2777',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(244, 114, 182, 0.15)'
                }}
              >
                <Send size={15} />
                <span>Send via SMS 📱</span>
              </button>

              {/* Copy Feedback */}
              <button
                onClick={handleCopyFeedback}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #e9d5ff',
                  borderRadius: '999px',
                  padding: '10px 16px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#9333ea',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(168, 85, 247, 0.15)'
                }}
              >
                {copied ? <Check size={15} color="#16a34a" /> : <Copy size={15} />}
                <span>{copied ? 'Copied! 💕' : 'Copy Text'}</span>
              </button>
            </div>

            {/* Post-submission message */}
            {feedbackSubmitted && (
              <div style={{
                background: '#fdf2f8',
                border: '1.5px solid #fbcfe8',
                borderRadius: '16px',
                padding: '8px 16px',
                color: '#db2777',
                fontSize: '12px',
                fontWeight: 700,
                marginTop: '6px',
                animation: 'fadeIn 0.3s ease-out'
              }}>
                💖 Sent! Thank you for the heartfelt rating, Bujji! Your smile is my happiness! 🥰
              </div>
            )}
          </div>
        )}

        {/* Bottom Signoff */}
        <div style={{
          fontSize: '11px',
          color: '#9ca3af',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          marginTop: '6px'
        }}>
          <span>Distance means nothing when someone means everything.</span>
          <span>•</span>
          <Heart size={12} color="#ec4899" fill="#ec4899" />
          <span>Forever my Bujji (Jashu)</span>
        </div>
      </div>
    </div>
  );
}


