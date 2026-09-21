import React, { useState, useEffect } from 'react';
import IntroLoader from './components/IntroLoader';
import ThemeToggle from './components/ThemeToggle';
import BackgroundEffects from './components/BackgroundEffects';
import MusicPlayer from './components/MusicPlayer';
import BirthdayLanding from './components/BirthdayLanding';
import InteractiveCake from './components/InteractiveCake';
import GiftReveal from './components/GiftReveal';
import BirthdayLetter from './components/BirthdayLetter';
import MasterPhotoAlbum from './components/MasterPhotoAlbum';
import FriendshipTimeline from './components/FriendshipTimeline';
import DistanceSection from './components/DistanceSection';
import MiniActivities from './components/MiniActivities';
import FinalCelebration from './components/FinalCelebration';
import FireworksEffect from './components/FireworksEffect';
import { ArrowLeft, ArrowRight, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { sfx } from './utils/soundEffects';

// All 9 discrete stages in the surprise journey (Zero-scroll architecture)
const STAGES = [
  { id: 'landing', label: '1. Mystery', icon: '❓' },
  { id: 'cake', label: '2. Cake & Hug', icon: '🎂' },
  { id: 'gift', label: '3. 3D Gift Box', icon: '🎁' },
  { id: 'letter', label: '4. Love Letter', icon: '📜' },
  { id: 'album', label: '5. Photo Album', icon: '📸' },
  { id: 'timeline', label: '6. Milestones', icon: '🌟' },
  { id: 'distance', label: '7. Distance', icon: '🗺️' },
  { id: 'activities', label: '8. Little Joys', icon: '🪄' },
  { id: 'celebration', label: '9. Celebration & Rating', icon: '🎉' }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [fireworksActive, setFireworksActive] = useState(false);
  const [autoPlayRequested, setAutoPlayRequested] = useState(false);
  const [yesAccepted, setYesAccepted] = useState(false);
  const [isPeekMode, setIsPeekMode] = useState(false);

  // STRICT ZERO-SCROLL ENFORCEMENT: Body & HTML are locked to 100vh with no scrollbars
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const currentStage = STAGES[currentStageIndex].id;

  // When Jashmitha clicks YES on the landing page!
  const handleSayYes = () => {
    setYesAccepted(true);
    setFireworksActive(true);
    setAutoPlayRequested(true);
    setCurrentStageIndex(1); // Move to Cake stage

    setTimeout(() => {
      setFireworksActive(false);
    }, 5000);
  };

  const handleNext = () => {
    if (currentStageIndex < STAGES.length - 1) {
      sfx.playChimeChord();
      setCurrentStageIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStageIndex > 0) {
      sfx.playChimeChord();
      setCurrentStageIndex(prev => prev - 1);
    }
  };

  const handleGoToStage = (index) => {
    // Only allow skipping ahead from landing if YES was accepted or going backwards
    if (currentStageIndex === 0 && !yesAccepted && index > 0) return;
    sfx.playChimeChord();
    setCurrentStageIndex(index);
  };

  const handleReplayJourney = () => {
    sfx.playChimeChord();
    setCurrentStageIndex(0);
    setYesAccepted(false);
    setAutoPlayRequested(false);
    setFireworksActive(false);
  };

  return (
    <div
      className={isPeekMode ? 'peek-mode-active' : ''}
      onClick={() => isPeekMode && setIsPeekMode(false)}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--bg-gradient)'
      }}
    >
      {/* Intro Loader Preloader */}
      {isLoading && (
        <IntroLoader onComplete={() => setIsLoading(false)} />
      )}

      {/* Theme Switcher (Day Dream <-> Night Sky) */}
      <ThemeToggle />

      {/* Peek Behind Floating Toggle Button (Look behind the cards to see floating balloons & ambient animations) */}
      <button
        onClick={() => {
          sfx.playChimeChord();
          setIsPeekMode(!isPeekMode);
        }}
        aria-label={isPeekMode ? "Show Card" : "Peek Behind Card"}
        style={{
          position: 'fixed',
          top: '16px',
          right: '68px',
          zIndex: 60,
          height: '40px',
          padding: '0 14px',
          borderRadius: '999px',
          background: isPeekMode ? 'linear-gradient(135deg, #ec4899, #db2777)' : 'var(--glass-bg)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          color: isPeekMode ? '#ffffff' : '#db2777',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          fontWeight: 700,
          transition: 'all 0.3s ease'
        }}
        title={isPeekMode ? "Restore card content" : "Peek behind to see floating balloons, hearts & animations"}
      >
        {isPeekMode ? <EyeOff size={16} /> : <Eye size={16} />}
        <span className="hidden sm:inline">{isPeekMode ? 'Show Card' : 'Peek Behind 👁️'}</span>
      </button>

      {/* Background Particles & Ambient Glow */}
      <BackgroundEffects showBalloons={currentStageIndex > 0} />

      {/* Fireworks Canvas on Milestones */}
      <FireworksEffect active={fireworksActive} />

      {/* Floating Background Music Player */}
      <MusicPlayer visible={true} autoPlayRequested={autoPlayRequested} />

      {/* TOP STAGE BREADCRUMB NAVIGATOR (Discreet & Elegant) */}
      <nav
        aria-label="Surprise stage navigator"
        style={{
          position: 'fixed',
          top: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 60,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '5px 12px',
          borderRadius: '999px',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 4px 20px rgba(244, 114, 182, 0.22)',
          maxWidth: '96vw',
          overflowX: 'auto',
          scrollbarWidth: 'none'
        }}
      >
        {STAGES.map((s, idx) => {
          const isActive = idx === currentStageIndex;
          const isPassed = idx < currentStageIndex;
          const canClick = yesAccepted || idx === 0;

          return (
            <button
              key={s.id}
              onClick={() => canClick && handleGoToStage(idx)}
              title={s.label}
              disabled={!canClick}
              style={{
                background: isActive ? 'linear-gradient(135deg, #f472b6, #db2777)' : 'transparent',
                color: isActive ? '#ffffff' : isPassed ? '#db2777' : '#9ca3af',
                border: 'none',
                borderRadius: '999px',
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: isActive ? 700 : 600,
                cursor: canClick ? 'pointer' : 'default',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.25s ease'
              }}
            >
              <span>{s.icon}</span>
              <span className="hidden sm:inline">{s.label.split('. ')[1]}</span>
            </button>
          );
        })}
      </nav>

      {/* MAIN VIEWPORT (Strict 100vh, Safe Viewport Space between Nav & Dock, Zero-Scroll) */}
      <main style={{
        position: 'absolute',
        top: '56px',
        bottom: '68px',
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        overflow: 'hidden',
        padding: '0 12px',
        boxSizing: 'border-box'
      }}>
        {/* STAGE 1: Cinematic Mystery Landing Page & Interactive Question */}
        {currentStage === 'landing' && (
          <div key="stage-landing" style={{ animation: 'fadeIn 0.5s ease-out', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BirthdayLanding onSayYes={handleSayYes} />
          </div>
        )}

        {/* STAGE 2: Birthday Reveal & Interactive Cake, First Bite, Hug */}
        {currentStage === 'cake' && (
          <div key="stage-cake" style={{ animation: 'fadeIn 0.5s ease-out', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <InteractiveCake onProceedToGift={() => setCurrentStageIndex(2)} />
          </div>
        )}

        {/* STAGE 3: 3D Glowing Gift Box Opening */}
        {currentStage === 'gift' && (
          <div key="stage-gift" style={{ animation: 'fadeIn 0.5s ease-out', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GiftReveal onProceedToLetter={() => setCurrentStageIndex(3)} />
          </div>
        )}

        {/* STAGE 4: Heartfelt Personal Birthday Letter */}
        {currentStage === 'letter' && (
          <div key="stage-letter" style={{ animation: 'fadeIn 0.5s ease-out', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BirthdayLetter onProceedToCollage={() => setCurrentStageIndex(4)} />
          </div>
        )}

        {/* STAGE 5: The Master Photo Album (All 20 Photos, Continuous Next/Prev Lightbox & Category Filters) */}
        {currentStage === 'album' && (
          <div key="stage-album" style={{ animation: 'fadeIn 0.5s ease-out', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MasterPhotoAlbum onProceedToMilestones={() => setCurrentStageIndex(5)} />
          </div>
        )}

        {/* STAGE 6: Friendship Milestones Interactive Explorer */}
        {currentStage === 'timeline' && (
          <div key="stage-timeline" style={{ animation: 'fadeIn 0.5s ease-out', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FriendshipTimeline onProceedToDistance={() => setCurrentStageIndex(6)} />
          </div>
        )}

        {/* STAGE 7: Across The Distance Constellation */}
        {currentStage === 'distance' && (
          <div key="stage-distance" style={{ animation: 'fadeIn 0.5s ease-out', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DistanceSection onProceedToActivities={() => setCurrentStageIndex(7)} />
          </div>
        )}

        {/* STAGE 8: Little Joy Activities & Secret Whispers */}
        {currentStage === 'activities' && (
          <div key="stage-activities" style={{ animation: 'fadeIn 0.5s ease-out', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MiniActivities onProceedToCelebration={() => setCurrentStageIndex(8)} />
          </div>
        )}

        {/* STAGE 9: The Grand Celebration Reveal & Rating Sent to Mobile */}
        {currentStage === 'celebration' && (
          <div key="stage-celebration" style={{ animation: 'fadeIn 0.5s ease-out', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FinalCelebration onReplayJourney={handleReplayJourney} />
          </div>
        )}
      </main>

      {/* BOTTOM NAVIGATION DOCK (Available across all stages) */}
      {currentStageIndex > 0 && (
        <footer
          style={{
            position: 'fixed',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '6px 16px',
            borderRadius: '999px',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)'
          }}
        >
          {/* Back Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous Page"
            style={{
              background: '#ffffff',
              border: '1px solid #fbcfe8',
              borderRadius: '999px',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#db2777',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>

          {/* Stage Progress Pill */}
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)' }}>
            {currentStageIndex + 1} / {STAGES.length}
          </span>

          {/* Next Button (if not final stage) */}
          {currentStageIndex < STAGES.length - 1 ? (
            <button
              onClick={handleNext}
              aria-label="Next Page"
              style={{
                background: 'linear-gradient(135deg, #f472b6, #db2777)',
                border: 'none',
                borderRadius: '999px',
                padding: '6px 16px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#ffffff',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 4px 12px rgba(219, 39, 119, 0.3)'
              }}
            >
              <span>Next</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleReplayJourney}
              aria-label="Replay All"
              style={{
                background: '#ffffff',
                border: '1px solid #c084fc',
                borderRadius: '999px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#9333ea',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <RotateCcw size={13} />
              <span>Replay</span>
            </button>
          )}
        </footer>
      )}
    </div>
  );
}
