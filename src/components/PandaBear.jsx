import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function PandaBear({ isCrying = false, isSmiling = false, noCount = 0, size = 160 }) {
  return (
    <div style={{
      position: 'relative',
      width: `${size}px`,
      height: `${size}px`,
      margin: '0 auto 14px auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Base Panda Image */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: '24px',
        overflow: 'hidden',
        animation: isSmiling
          ? 'pandaHappyBounce 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite alternate'
          : isCrying
            ? 'shakeCute 0.7s ease-in-out'
            : 'gentleFloat 3s ease-in-out infinite',
        filter: isSmiling ? 'drop-shadow(0 8px 20px rgba(244, 114, 182, 0.45))' : 'drop-shadow(0 6px 14px rgba(0,0,0,0.12))',
        transition: 'transform 0.4s ease'
      }}>
        <img
          src="./assets/crying-panda.png"
          alt="Cute Panda"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: isSmiling ? 'scale(1.04)' : 'scale(1)',
            transition: 'all 0.4s ease'
          }}
        />

        {/* WHEN SMILING: Happy Face SVG Overlay (Covers tears, turns frown into a radiant joyful smile!) */}
        {isSmiling && (
          <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            animation: 'fadeIn 0.4s ease-out forwards'
          }}>
            <svg width="100%" height="100%" viewBox="0 0 700 700" fill="none">
              {/* White mask over teardrops on the cheeks */}
              <ellipse cx="270" cy="480" rx="42" ry="70" fill="#ffffff" />
              <ellipse cx="430" cy="480" rx="42" ry="70" fill="#ffffff" />

              {/* White mask over original eyes and sad mouth */}
              <ellipse cx="270" cy="360" rx="75" ry="75" fill="#ffffff" />
              <ellipse cx="430" cy="360" rx="75" ry="75" fill="#ffffff" />
              <ellipse cx="350" cy="405" rx="35" ry="25" fill="#ffffff" />

              {/* Black eye patches */}
              <ellipse cx="270" cy="355" rx="80" ry="75" fill="#18181b" />
              <ellipse cx="430" cy="355" rx="80" ry="75" fill="#18181b" />

              {/* Joyful Happy Crescent Eyes (^ ^) */}
              <path
                d="M 230 365 Q 270 315 310 365"
                stroke="#ffffff"
                strokeWidth="14"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 390 365 Q 430 315 470 365"
                stroke="#ffffff"
                strokeWidth="14"
                strokeLinecap="round"
                fill="none"
              />

              {/* Little cute eye sparkles */}
              <circle cx="270" cy="315" r="8" fill="#fde047" />
              <circle cx="430" cy="315" r="8" fill="#fde047" />

              {/* Cute Panda Nose */}
              <ellipse cx="350" cy="375" rx="20" ry="14" fill="#18181b" />

              {/* Big Joyful Happy Smile with Pink Tongue ( ‿ ) */}
              <path
                d="M 305 400 Q 350 460 395 400"
                stroke="#18181b"
                strokeWidth="12"
                strokeLinecap="round"
                fill="#f43f5e"
              />
              <path
                d="M 330 422 Q 350 445 370 422"
                fill="#fbcfe8"
              />

              {/* Blushing Rosy Glowing Cheeks */}
              <ellipse cx="190" cy="410" rx="35" ry="22" fill="#f472b6" opacity="0.65" filter="blur(3px)" />
              <ellipse cx="510" cy="410" rx="35" ry="22" fill="#f472b6" opacity="0.65" filter="blur(3px)" />
            </svg>
          </div>
        )}
      </div>

      {/* CRYING EFFECTS: Animated teardrops splashing when NO is clicked */}
      {isCrying && !isSmiling && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {/* Animated dripping water droplets */}
          <div style={{
            position: 'absolute',
            bottom: '22px',
            left: '32%',
            fontSize: '18px',
            animation: 'tearDrop 0.9s ease-in infinite'
          }}>
            💧
          </div>
          <div style={{
            position: 'absolute',
            bottom: '22px',
            right: '32%',
            fontSize: '18px',
            animation: 'tearDrop 0.9s ease-in infinite',
            animationDelay: '0.45s'
          }}>
            💧
          </div>

          {/* Heavy sobbing teardrops for high NO counts */}
          {noCount >= 3 && (
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '26%',
              fontSize: '16px',
              animation: 'tearDrop 0.8s ease-in infinite',
              animationDelay: '0.2s'
            }}>
              💧
            </div>
          )}
          {noCount >= 4 && (
            <div style={{
              position: 'absolute',
              bottom: '12px',
              right: '26%',
              fontSize: '16px',
              animation: 'tearDrop 0.8s ease-in infinite',
              animationDelay: '0.6s'
            }}>
              💧
            </div>
          )}
        </div>
      )}

      {/* SMILING EFFECTS: Floating Love Hearts & Sparkles */}
      {isSmiling && (
        <div style={{ position: 'absolute', inset: -20, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute',
            top: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'gentleFloat 1.8s infinite alternate'
          }}>
            <Heart size={28} fill="#ec4899" color="#db2777" />
          </div>
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '-10px',
            animation: 'gentleFloat 2.2s infinite alternate',
            animationDelay: '0.3s'
          }}>
            <Sparkles size={22} color="#f59e0b" />
          </div>
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '-10px',
            animation: 'gentleFloat 2s infinite alternate',
            animationDelay: '0.6s'
          }}>
            <Heart size={20} fill="#f43f5e" color="#f43f5e" />
          </div>
        </div>
      )}

      <style>{`
        @keyframes pandaHappyBounce {
          0% { transform: translateY(0) scale(1.02); }
          100% { transform: translateY(-14px) scale(1.08) rotate(2deg); }
        }
      `}</style>
    </div>
  );
}
