import React, { useMemo } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function BackgroundEffects({ showBalloons = false }) {
  // Generate random floating balloons (only rendered after the surprise reveal)
  const balloons = useMemo(() => {
    const colors = [
      'linear-gradient(135deg, #f472b6, #db2777)', // Pink
      'linear-gradient(135deg, #c084fc, #9333ea)', // Purple
      'linear-gradient(135deg, #fde047, #f59e0b)', // Warm Gold
      'linear-gradient(135deg, #fb7185, #e11d48)', // Rose
      'linear-gradient(135deg, #a7f3d0, #10b981)', // Soft Mint
      'linear-gradient(135deg, #fed7aa, #f97316)'  // Peach
    ];

    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${(i * 7.5 + (i % 3) * 4) % 96}%`,
      size: 32 + (i % 5) * 8,
      color: colors[i % colors.length],
      duration: `${14 + (i % 7) * 3}s`,
      delay: `${(i * 1.8) % 12}s`
    }));
  }, []);

  // Drifting hearts (gentle ambient)
  const hearts = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: `${(i * 6.2 + 3) % 94}%`,
      size: 14 + (i % 4) * 6,
      duration: `${12 + (i % 6) * 2.5}s`,
      delay: `${(i * 1.6) % 10}s`,
      color: i % 2 === 0 ? '#f472b6' : '#c084fc'
    }));
  }, []);

  // Ambient sparkling stars (always present for starry atmosphere)
  const sparkles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      top: `${(i * 13 + 5) % 92}%`,
      left: `${(i * 17 + 8) % 92}%`,
      size: 12 + (i % 3) * 6,
      delay: `${(i * 0.7) % 4}s`,
      duration: `${2.5 + (i % 3)}s`
    }));
  }, []);

  return (
    <div className="bg-dream-mesh" aria-hidden="true">
      {/* Dreamy blur orbs */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="glow-orb glow-orb-3" />

      {/* Twinkling ambient sparkles */}
      {sparkles.map(sp => (
        <div
          key={`sparkle-${sp.id}`}
          style={{
            position: 'absolute',
            top: sp.top,
            left: sp.left,
            animation: `softBlink ${sp.duration} ease-in-out infinite`,
            animationDelay: sp.delay,
            color: '#fbbf24',
            opacity: 0.5,
            pointerEvents: 'none'
          }}
        >
          <Sparkles size={sp.size} />
        </div>
      ))}

      {/* Drifting soft hearts */}
      {hearts.map(h => (
        <div
          key={`heart-${h.id}`}
          className="floating-heart"
          style={{
            left: h.left,
            animationDuration: h.duration,
            animationDelay: h.delay,
            color: h.color,
            opacity: showBalloons ? 0.65 : 0.35
          }}
        >
          <Heart size={h.size} fill={h.color} />
        </div>
      ))}

      {/* Floating balloons ONLY once celebration is triggered (Page 2+) */}
      {showBalloons && balloons.map(b => (
        <div
          key={`balloon-${b.id}`}
          className="balloon"
          style={{
            left: b.left,
            width: `${b.size}px`,
            height: `${b.size * 1.25}px`,
            background: b.color,
            animationDuration: b.duration,
            animationDelay: b.delay,
            boxShadow: 'inset -5px -5px 12px rgba(0,0,0,0.1), inset 6px 6px 12px rgba(255,255,255,0.45)'
          }}
        >
          <div className="balloon-knot" />
        </div>
      ))}
    </div>
  );
}
