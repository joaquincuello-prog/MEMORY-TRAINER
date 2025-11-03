// src/utils/soundManager.js

class SoundManager {
  constructor() {
    this.audioContext = null;
    this.enabled = true;
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playSound(frequency, duration, type = 'sine') {
    if (!this.enabled) return;
    
    this.init();
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Sonido de click/flip
  click() {
    this.playSound(800, 0.1, 'sine');
  }

  // Sonido de match/acierto
  success() {
    this.playSound(523, 0.1, 'sine');
    setTimeout(() => this.playSound(659, 0.15, 'sine'), 100);
    setTimeout(() => this.playSound(784, 0.2, 'sine'), 200);
  }

  // Sonido de error
  error() {
    this.playSound(200, 0.2, 'sawtooth');
    setTimeout(() => this.playSound(150, 0.3, 'sawtooth'), 150);
  }

  // Sonido de victoria
  victory() {
    const notes = [523, 587, 659, 784, 880];
    notes.forEach((note, index) => {
      setTimeout(() => this.playSound(note, 0.3, 'sine'), index * 100);
    });
  }

  // Sonido de nivel completado
  levelUp() {
    this.playSound(659, 0.15, 'sine');
    setTimeout(() => this.playSound(784, 0.15, 'sine'), 100);
    setTimeout(() => this.playSound(988, 0.2, 'sine'), 200);
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }
}

export default new SoundManager();