import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Heart } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
    isPassed: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const target = BIRTHDAY_DATA.birthdayDate;

      // Check if today is September 22, 2026
      const isSameYear = now.getFullYear() === target.getFullYear();
      const isSameMonth = now.getMonth() === target.getMonth();
      const isSameDate = now.getDate() === target.getDate();

      if (isSameYear && isSameMonth && isSameDate) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: true,
          isPassed: false
        });
        return;
      }

      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: false,
          isPassed: true
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isToday: false,
        isPassed: false
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{
      padding: '4rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="glass-card" style={{
        maxWidth: '820px',
        width: '100%',
        padding: '2.8rem 1.5rem',
        textAlign: 'center',
        border: '2px solid rgba(254, 240, 138, 0.85)',
        boxShadow: '0 20px 45px rgba(245, 158, 11, 0.15), 0 0 25px rgba(244, 114, 182, 0.2)'
      }}>
        {/* Header Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: '#d97706',
          fontSize: '13px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '12px'
        }}>
          <Clock size={16} />
          <span>Official Birthday Countdown</span>
          <Sparkles size={16} />
        </div>

        <h3 className="font-serif" style={{
          fontSize: 'clamp(1.8rem, 3.8vw, 2.5rem)',
          color: 'var(--color-text-title)',
          marginBottom: '8px',
          fontWeight: 700
        }}>
          September 22, 2026 • 10:45 AM
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--color-secondary)',
          marginBottom: '24px',
          fontWeight: 500
        }}>
          Born at 10:45 AM — the exact moment my Jashu (Bangaaram) blessed this world! 🌟✨
        </p>

        {/* State 1: Today is the Birthday! */}
        {timeLeft.isToday && (
          <div style={{
            padding: '2rem 1rem',
            background: 'linear-gradient(135deg, #fdf2f8, #fef3c7)',
            borderRadius: '20px',
            border: '2px dashed #f472b6'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '8px', animation: 'gentleFloat 2s infinite' }}>
              🎂🎉💖
            </div>
            <h4 className="font-serif" style={{ fontSize: '2rem', color: '#db2777', fontWeight: 700, margin: '8px 0' }}>
              Today is your special day! 🎂💖
            </h4>
            <p style={{ color: '#6b21a8', fontSize: '1.15rem' }}>
              Happy Birthday, Jashu! Celebrating 10:45 AM, the moment my dearest Bangaaram was born! May this year bring you boundless happiness, peace, and smiles!
            </p>
          </div>
        )}

        {/* State 2: Birthday has passed */}
        {timeLeft.isPassed && !timeLeft.isToday && (
          <div style={{
            padding: '2rem 1rem',
            background: 'linear-gradient(135deg, #fdf2f8, #f5f3ff)',
            borderRadius: '20px',
            border: '2px solid #e9d5ff'
          }}>
            <div style={{ fontSize: '42px', marginBottom: '8px' }}>
              🌟✨🎂
            </div>
            <h4 className="font-serif" style={{ fontSize: '1.8rem', color: '#7c3aed', fontWeight: 700 }}>
              Celebrating Jashmitha's Beautiful Year! 🎉
            </h4>
            <p style={{ color: '#4b5563', fontSize: '1.1rem', marginTop: '6px' }}>
              Every day is a celebration of our wonderful friendship. Keep shining bright!
            </p>
          </div>
        )}

        {/* State 3: Active Countdown */}
        {!timeLeft.isToday && !timeLeft.isPassed && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: '16px',
            maxWidth: '650px',
            margin: '0 auto'
          }}>
            {[
              { label: 'Days', value: timeLeft.days, color: '#ec4899' },
              { label: 'Hours', value: timeLeft.hours, color: '#a855f7' },
              { label: 'Minutes', value: timeLeft.minutes, color: '#d97706' },
              { label: 'Seconds', value: timeLeft.seconds, color: '#db2777' }
            ].map((unit, index) => (
              <div
                key={index}
                style={{
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 241, 242, 0.9) 100%)',
                  padding: '18px 10px',
                  borderRadius: '20px',
                  border: '1.5px solid rgba(251, 207, 232, 0.9)',
                  boxShadow: '0 8px 20px rgba(244, 114, 182, 0.12)'
                }}
              >
                <div className="font-serif" style={{
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  fontWeight: 700,
                  color: unit.color,
                  lineHeight: 1
                }}>
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginTop: '6px'
                }}>
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '24px', color: 'var(--color-text-muted)', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Heart size={14} color="#f472b6" fill="#f472b6" />
          <span>Counting every second until 10:45 AM for my dearest Jashu (Bangaaram)!</span>
          <Heart size={14} color="#f472b6" fill="#f472b6" />
        </div>
      </div>
    </section>
  );
}
