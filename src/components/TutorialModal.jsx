import { useState } from 'react';

export default function TutorialModal({ gameType, onClose }) {
  const tutorials = {
    memoria_cartas: {
      icon: '🎴',
      title: 'Cómo jugar Memoria de Cartas',
      steps: [
        { emoji: '👀', text: 'Observa las cartas en el tablero' },
        { emoji: '🖱️', text: 'Haz clic en dos cartas para voltearlas' },
        { emoji: '🎯', text: 'Encuentra todos los pares idénticos' },
        { emoji: '⭐', text: 'Completa en menos movimientos para más puntos' }
      ],
      tip: 'Consejo: Memoriza las posiciones de las cartas que ya viste'
    },
    secuencia_numeros: {
      icon: '🔢',
      title: 'Cómo jugar Secuencia de Números',
      steps: [
        { emoji: '👀', text: 'Observa la secuencia de números que aparece' },
        { emoji: '🧠', text: 'Memoriza el orden exacto' },
        { emoji: '🖱️', text: 'Repite la secuencia haciendo clic en los números' },
        { emoji: '📈', text: 'Cada nivel agrega un número más' }
      ],
      tip: 'Consejo: Repite mentalmente la secuencia mientras la ves'
    },
    memoria_espacial: {
      icon: '🧩',
      title: 'Cómo jugar Memoria Espacial',
      steps: [
        { emoji: '⭐', text: 'Aparecerán objetos en diferentes posiciones' },
        { emoji: '⏱️', text: 'Tienes pocos segundos para memorizarlos' },
        { emoji: '🎯', text: 'Selecciona todas las posiciones correctas' },
        { emoji: '❌', text: 'Máximo 3 errores permitidos' }
      ],
      tip: 'Consejo: Agrupa mentalmente los objetos por áreas'
    }
  };

  const tutorial = tutorials[gameType];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 3000,
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        animation: 'slideUp 0.4s ease',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '15px' }}>
            {tutorial.icon}
          </div>
          <h2 style={{
            color: '#667eea',
            margin: 0,
            fontSize: '26px'
          }}>
            {tutorial.title}
          </h2>
        </div>

        {/* Steps */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {tutorial.steps.map((step, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              padding: '15px',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              borderRadius: '12px',
              animation: `slideUp 0.4s ease ${index * 0.1}s backwards`
            }}>
              <div style={{
                fontSize: '32px',
                minWidth: '40px',
                textAlign: 'center'
              }}>
                {step.emoji}
              </div>
              <div style={{
                flex: 1,
                color: '#333',
                fontSize: '15px',
                fontWeight: '500'
              }}>
                {step.text}
              </div>
            </div>
          ))}
        </div>

        {/* Tip */}
        <div style={{
          background: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '30px',
          border: '2px dashed #f39c12'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '8px'
          }}>
            <span style={{ fontSize: '24px' }}>💡</span>
            <strong style={{ color: '#f39c12', fontSize: '16px' }}>
              Tip Pro
            </strong>
          </div>
          <p style={{
            margin: 0,
            color: '#333',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            {tutorial.tip}
          </p>
        </div>

        {/* Checkbox */}
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px',
          cursor: 'pointer',
          padding: '10px',
          borderRadius: '8px',
          transition: 'background 0.3s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = '#f5f7fa'}
        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <input
            type="checkbox"
            onChange={(e) => {
              localStorage.setItem(`tutorial_${gameType}_seen`, e.target.checked);
            }}
            style={{
              width: '20px',
              height: '20px',
              cursor: 'pointer'
            }}
          />
          <span style={{ color: '#666', fontSize: '14px' }}>
            No volver a mostrar este tutorial
          </span>
        </label>

        {/* Button */}
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '16px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          ¡Entendido, vamos a jugar! 🚀
        </button>
      </div>
    </div>
  );
}