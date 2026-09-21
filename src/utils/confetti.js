import confetti from 'canvas-confetti';

/**
 * Trigger a festive confetti burst
 */
export function triggerCelebrationConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  // Multi-layered blast
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#f472b6', '#ec4899', '#fbcfe8', '#fef08a']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#c084fc', '#e879f9', '#ffffff', '#fbbf24']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#f43f5e', '#fb7185', '#a855f7', '#fbbf24']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#fde047', '#f472b6', '#ffffff']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#ec4899', '#a855f7', '#facc15']
  });
}

/**
 * Continuous gentle side cannons for the grand surprise reveal
 */
export function triggerFireworksShower(durationMs = 3500) {
  const animationEnd = Date.now() + durationMs;
  const colors = ['#f472b6', '#c084fc', '#fde047', '#ffffff', '#fb7185'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: colors
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: colors
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  })();
}

/**
 * Little sparkle burst for the gift box opening
 */
export function triggerGiftOpenConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.5 },
    colors: ['#fbcfe8', '#f472b6', '#fde68a', '#e9d5ff', '#ffffff']
  });
}
