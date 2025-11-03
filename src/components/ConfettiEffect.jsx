import { useEffect, useState } from 'react';

export default function ConfettiEffect({ active, duration = 3000 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!active) return;

    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd', '#00d2d3', '#ff9ff3', '#54a0ff'];
    const newParticles = [];

    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2
      });
    }

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
    }, duration);

    return () => clearTimeout(timer);
  }, [active, duration]);

  if (!active || particles.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: '10px',
            height: '10px',
            background: particle.color,
            borderRadius: particle.id % 2 === 0 ? '50%' : '0',
            animation: `fall ${particle.duration}s ease-in ${particle.delay}s forwards`,
            transform: `rotate(${particle.rotation}deg)`
          }}
        />
      ))}

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}