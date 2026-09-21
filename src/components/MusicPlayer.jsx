import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Info, Sparkles } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../data/messages';
import { musicBox } from '../utils/audioMelody';

export default function MusicPlayer({ visible = true, autoPlayRequested = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [showInfo, setShowInfo] = useState(false);
  const [useSynthesizer, setUseSynthesizer] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;

    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    const handleError = () => {
      setUseSynthesizer(true);
      if (isPlaying) {
        musicBox.setVolume(isMuted ? 0 : volume);
        musicBox.start();
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      musicBox.stop();
    };
  }, []);

  // Handle autoPlay request from parent (e.g. once revealed)
  useEffect(() => {
    if (visible && autoPlayRequested && !isPlaying) {
      togglePlay();
    }
  }, [visible, autoPlayRequested]);

  // Handle volume changes
  useEffect(() => {
    const activeVol = isMuted ? 0 : volume;
    if (audioRef.current && !useSynthesizer) {
      audioRef.current.volume = activeVol;
    }
    musicBox.setVolume(activeVol);
  }, [volume, isMuted, useSynthesizer]);

  const togglePlay = () => {
    if (isPlaying) {
      if (useSynthesizer) {
        musicBox.stop();
      } else if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      if (audioRef.current && !useSynthesizer) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setUseSynthesizer(true);
            musicBox.setVolume(isMuted ? 0 : volume);
            musicBox.start();
            setIsPlaying(true);
          });
      } else {
        musicBox.setVolume(isMuted ? 0 : volume);
        musicBox.start();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // If hidden during mystery page
  if (!visible) {
    return <audio ref={audioRef} src={BIRTHDAY_CONFIG.music.audioSrc} preload="auto" />;
  }

  return (
    <>
      <audio ref={audioRef} src={BIRTHDAY_CONFIG.music.audioSrc} preload="auto" />

      {/* Floating Music Widget */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px',
        animation: 'fadeIn 0.8s ease-out'
      }}>
        {/* Info Tooltip Popup */}
        {showInfo && (
          <div className="glass-card" style={{
            padding: '12px 16px',
            maxWidth: '280px',
            fontSize: '12px',
            lineHeight: '1.5',
            color: '#4b5563',
            marginBottom: '4px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <p style={{ fontWeight: 600, color: '#db2777', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={14} /> Background Music
            </p>
            <p>
              Playing: <strong>{useSynthesizer ? 'Melodic Music Box' : BIRTHDAY_CONFIG.music.title}</strong>
            </p>
            <p style={{ marginTop: '6px', color: '#9ca3af', fontSize: '11px' }}>
              💡 To play your own song, drop <code>birthday-song.mp3</code> into <code>public/music/</code>!
            </p>
          </div>
        )}

        {/* Music Control Bar */}
        <div className="glass-card" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 16px',
          borderRadius: '9999px',
          boxShadow: '0 10px 30px rgba(244, 114, 182, 0.25)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)'
        }}>
          {/* Animated Vinyl Disc Icon */}
          <div
            onClick={togglePlay}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f472b6, #a855f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff',
              boxShadow: isPlaying ? '0 0 15px rgba(236, 72, 153, 0.6)' : 'none',
              animation: isPlaying ? 'spinDisc 4s linear infinite' : 'none',
              transition: 'transform 0.2s ease'
            }}
            title={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            {isPlaying ? <Music size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
          </div>

          {isPlaying && (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '18px' }}>
              {[0.4, 0.8, 0.5, 0.9, 0.3].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: '3px',
                    backgroundColor: '#ec4899',
                    borderRadius: '2px',
                    height: '100%',
                    animation: `equalizerPulse 1s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.18}s`
                  }}
                />
              ))}
            </div>
          )}

          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#db2777',
              display: 'flex',
              alignItems: 'center',
              padding: '4px'
            }}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isMuted ? '#9ca3af' : '#db2777',
              display: 'flex',
              alignItems: 'center',
              padding: '4px'
            }}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            style={{
              width: '60px',
              accentColor: '#ec4899',
              cursor: 'pointer'
            }}
            title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
          />

          <button
            onClick={() => setShowInfo(!showInfo)}
            aria-label="Music Information"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#9ca3af',
              display: 'flex',
              alignItems: 'center',
              padding: '4px'
            }}
          >
            <Info size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
