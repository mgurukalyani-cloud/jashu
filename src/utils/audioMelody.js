/**
 * Web Audio API Music-Box Melody Synthesizer
 * Plays a gentle, nostalgic, emotional music-box melody of Happy Birthday & friendship chimes
 * Zero external audio files required as fallback!
 */

class MusicBoxSynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.volume = 0.5;
    this.timeoutIds = [];
    this.gainNode = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.gainNode.connect(this.ctx.destination);
      }
    }
  }

  // Play a music-box chime note
  playChime(frequency, startTime, duration = 1.2) {
    if (!this.ctx || !this.gainNode) return;

    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Sine + Triangle harmonic for crystal music-box timbre
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, startTime);

      // Music box envelope: fast attack, gentle bell decay
      noteGain.gain.setValueAtTime(0.001, startTime);
      noteGain.gain.exponentialRampToValueAtTime(0.35, startTime + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch {
      // Audio context might be closing or paused
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  start() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.scheduleMelody();
  }

  stop() {
    this.isPlaying = false;
    this.timeoutIds.forEach(id => clearTimeout(id));
    this.timeoutIds = [];
  }

  scheduleMelody() {
    if (!this.isPlaying || !this.ctx) return;

    const now = this.ctx.currentTime;
    // Frequencies for Happy Birthday / Sweet Music Box (Key of C / G)
    // G4, G4, A4, G4, C5, B4
    // G4, G4, A4, G4, D5, C5
    // G4, G4, G5, E5, C5, B4, A4
    // F5, F5, E5, C5, D5, C5
    const notes = [
      { f: 392.00, d: 0.4 }, // G4
      { f: 392.00, d: 0.4 }, // G4
      { f: 440.00, d: 0.8 }, // A4
      { f: 392.00, d: 0.8 }, // G4
      { f: 523.25, d: 0.8 }, // C5
      { f: 493.88, d: 1.4 }, // B4

      { f: 392.00, d: 0.4 }, // G4
      { f: 392.00, d: 0.4 }, // G4
      { f: 440.00, d: 0.8 }, // A4
      { f: 392.00, d: 0.8 }, // G4
      { f: 587.33, d: 0.8 }, // D5
      { f: 523.25, d: 1.4 }, // C5

      { f: 392.00, d: 0.4 }, // G4
      { f: 392.00, d: 0.4 }, // G4
      { f: 783.99, d: 0.8 }, // G5
      { f: 659.25, d: 0.8 }, // E5
      { f: 523.25, d: 0.8 }, // C5
      { f: 493.88, d: 0.8 }, // B4
      { f: 440.00, d: 1.4 }, // A4

      { f: 698.46, d: 0.4 }, // F5
      { f: 698.46, d: 0.4 }, // F5
      { f: 659.25, d: 0.8 }, // E5
      { f: 523.25, d: 0.8 }, // C5
      { f: 587.33, d: 0.8 }, // D5
      { f: 523.25, d: 2.2 }, // C5
    ];

    let cursor = now + 0.1;
    for (const n of notes) {
      this.playChime(n.f, cursor, n.d * 1.8);
      // add a light octaved sparkle on major beats
      if (n.d >= 0.8) {
        this.playChime(n.f * 2, cursor + 0.05, 0.8);
      }
      cursor += n.d * 0.95;
    }

    const loopLengthMs = (cursor - now + 2) * 1000;
    const tid = setTimeout(() => {
      if (this.isPlaying) {
        this.scheduleMelody();
      }
    }, loopLengthMs);
    this.timeoutIds.push(tid);
  }
}

export const musicBox = new MusicBoxSynthesizer();
