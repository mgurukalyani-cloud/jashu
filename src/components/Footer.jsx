import React from 'react';
import { Heart, Sparkles, ArrowUp, RefreshCw } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';

export default function Footer({ onResetAll }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      padding: '3rem 1.5rem 5rem 1.5rem',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10,
      borderTop: '1px solid rgba(251, 207, 232, 0.7)',
      background: 'linear-gradient(180deg, transparent 0%, rgba(253, 242, 248, 0.7) 100%)'
    }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <p style={{
          fontSize: '14px',
          color: 'var(--color-text-muted)',
          lineHeight: '1.7',
          marginBottom: '20px'
        }}>
          "Distance may keep us apart physically because of homes and colleges, but our friendship and memories will always keep us close in our hearts."
        </p>

        <div style={{
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px'
        }}>
          <span>Crafted with infinite care for {BIRTHDAY_DATA.nickname} ({BIRTHDAY_DATA.name})</span>
          <span>•</span>
          <Sparkles size={12} color="#f59e0b" />
          <span>September 22 • 10:45 AM</span>
        </div>
      </div>
    </footer>
  );
}
