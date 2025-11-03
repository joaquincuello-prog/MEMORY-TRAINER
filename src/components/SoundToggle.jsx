import { useState } from 'react';
import soundManager from '../utils/soundManager';

export default function SoundToggle() {
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isEnabled());

  const toggleSound = () => {
    const newState = soundManager.toggle();
    setSoundEnabled(newState);
    if (newState) soundManager.click();
  };

  return (
    <button
      onClick={toggleSound}
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        background: soundEnabled 
          ? 'linear-gradient(135deg, #48bb78, #38a169)' 
          : 'rgba(255,255,255,0.9)',
        border: 'none',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        fontSize: '24px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        zIndex: 100,
        transition: 'all 0.3s ease'
      }}
      title={soundEnabled ? 'Sonido activado' : 'Sonido desactivado'}
    >
      {soundEnabled ? '🔊' : '🔇'}
    </button>
  );
}