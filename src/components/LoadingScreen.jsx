import { useState, useEffect } from 'react';

export default function LoadingScreen({ onLoadComplete, gameIcon = '🎮', gameName = 'Cargando...' }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Preparando el juego');

  useEffect(() => {
    const texts = [
      'Preparando el juego',
      'Cargando recursos',
      'Mezclando cartas',
      '¡Casi listo!'
    ];

    let currentText = 0;
    const textInterval = setInterval(() => {
      currentText = (currentText + 1) % texts.length;
      setLoadingText(texts[currentText]);
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setTimeout(() => onLoadComplete(), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onLoadComplete]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      animation: progress >= 100 ? 'fadeOut 0.5s ease forwards' : 'none'
    }}>
      {/* Icono animado */}
      <div style={{
        fontSize: '120px',
        marginBottom: '40px',
        animation: 'bounce 1s ease infinite'
      }}>
        {gameIcon}
      </div>

      {/* Nombre del juego */}
      <h2 style={{
        color: 'white',
        fontSize: '32px',
        marginBottom: '20px',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
      }}>
        {gameName}
      </h2>

      {/* Texto de carga */}
      <p style={{
        color: 'rgba(255,255,255,0.9)',
        fontSize: '18px',
        marginBottom: '40px',
        animation: 'pulse 1s ease infinite'
      }}>
        {loadingText}...
      </p>

      {/* Barra de progreso */}
      <div style={{
        width: '300px',
        height: '8px',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #48bb78, #38a169)',
          borderRadius: '10px',
          transition: 'width 0.3s ease',
          boxShadow: '0 0 10px rgba(72, 187, 120, 0.5)'
        }} />
      </div>

      {/* Porcentaje */}
      <p style={{
        color: 'white',
        fontSize: '16px',
        marginTop: '15px',
        fontWeight: 'bold'
      }}>
        {progress}%
      </p>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes fadeOut {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  );
}