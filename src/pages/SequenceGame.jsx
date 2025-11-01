import { useState, useEffect, useRef } from 'react';

export default function SequenceGame({ usuario, onGameEnd }) {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [activeNumber, setActiveNumber] = useState(null);
  const [message, setMessage] = useState('¡Presiona INICIAR para comenzar!');
  const [time, setTime] = useState(0);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Temporizador
  useEffect(() => {
    let interval;
    if (gameStarted && !gameOver) {
      interval = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  const startGame = () => {
    setSequence([]);
    setUserSequence([]);
    setLevel(1);
    setScore(0);
    setGameStarted(true);
    setGameOver(false);
    setTime(0);
    setMessage('Memoriza la secuencia...');
    nextRound([]);
  };

  const nextRound = (currentSequence) => {
    setIsPlaying(true);
    setUserSequence([]);
    
    // Agregar un nuevo número aleatorio a la secuencia
    const newNumber = numbers[Math.floor(Math.random() * numbers.length)];
    const newSequence = [...currentSequence, newNumber];
    setSequence(newSequence);
    
    // Mostrar la secuencia con delay
    setTimeout(() => {
      playSequence(newSequence);
    }, 500);
  };

  const playSequence = async (seq) => {
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setActiveNumber(seq[i]);
      await new Promise(resolve => setTimeout(resolve, 400));
      setActiveNumber(null);
    }
    setIsPlaying(false);
    setMessage('¡Tu turno! Repite la secuencia');
  };

  const handleNumberClick = (number) => {
    if (isPlaying || gameOver) return;

    const newUserSequence = [...userSequence, number];
    setUserSequence(newUserSequence);

    // Efecto visual de click
    setActiveNumber(number);
    setTimeout(() => setActiveNumber(null), 200);

    // Verificar si el número es correcto
    const currentIndex = newUserSequence.length - 1;
    
    if (newUserSequence[currentIndex] !== sequence[currentIndex]) {
      // Error - Fin del juego
      setGameOver(true);
      setGameStarted(false);
      setMessage('¡Secuencia incorrecta! Juego terminado');
      handleGameEnd();
      return;
    }

    // Si completó la secuencia correctamente
    if (newUserSequence.length === sequence.length) {
      const newScore = score + (level * 100);
      setScore(newScore);
      setLevel(level + 1);
      setMessage('¡Correcto! Preparando siguiente nivel...');
      
      setTimeout(() => {
        nextRound(sequence);
      }, 1500);
    }
  };

  const handleGameEnd = async () => {
    try {
      await fetch('http://localhost:3001/partidas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: usuario.id,
          juego_tipo: 'secuencia_numeros',
          nivel: 'intermedio',
          puntaje: score,
          tiempo_segundos: time
        })
      });
      
      if (onGameEnd) onGameEnd(score);
    } catch (error) {
      console.error('Error al guardar partida:', error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%'
      }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ margin: 0, color: '#f5576c', fontSize: '28px' }}>
            🔢 Secuencia de Números
          </h1>
          <p style={{ margin: '10px 0 0 0', color: '#666' }}>
            Nivel Intermedio - Memoriza y repite la secuencia
          </p>
        </div>

        {/* Estadísticas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '15px',
          marginBottom: '20px'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '12px',
            padding: '15px',
            textAlign: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f093fb' }}>
              {level}
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
              Nivel
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '12px',
            padding: '15px',
            textAlign: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f5576c' }}>
              {score}
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
              Puntos
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '12px',
            padding: '15px',
            textAlign: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#48bb78' }}>
              {formatTime(time)}
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
              Tiempo
            </div>
          </div>
        </div>

        {/* Mensaje de estado */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
        }}>
          <p style={{ 
            margin: 0, 
            fontSize: '18px', 
            color: gameOver ? '#f5576c' : '#333',
            fontWeight: 'bold'
          }}>
            {message}
          </p>
          {userSequence.length > 0 && !isPlaying && !gameOver && (
            <p style={{ margin: '10px 0 0 0', color: '#666', fontSize: '14px' }}>
              Progreso: {userSequence.length} / {sequence.length}
            </p>
          )}
        </div>

        {/* Tablero de números */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '15px'
          }}>
            {numbers.map(number => {
              const isActive = activeNumber === number;
              const isDisabled = isPlaying || !gameStarted || gameOver;
              
              return (
                <button
                  key={number}
                  onClick={() => handleNumberClick(number)}
                  disabled={isDisabled}
                  style={{
                    aspectRatio: '1',
                    fontSize: '36px',
                    fontWeight: 'bold',
                    borderRadius: '16px',
                    border: 'none',
                    background: isActive 
                      ? 'linear-gradient(135deg, #f093fb, #f5576c)'
                      : 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    opacity: isDisabled ? 0.5 : 1,
                    transform: isActive ? 'scale(0.95)' : 'scale(1)',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive 
                      ? '0 2px 8px rgba(0,0,0,0.2)' 
                      : '0 4px 16px rgba(0,0,0,0.2)',
                    userSelect: 'none'
                  }}
                  onMouseOver={(e) => {
                    if (!isDisabled) {
                      e.target.style.transform = 'scale(1.05)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isDisabled && !isActive) {
                      e.target.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {number}
                </button>
              );
            })}
          </div>
        </div>

        {/* Botones */}
        <div style={{ display: 'flex', gap: '15px' }}>
          {!gameStarted ? (
            <button
              onClick={startGame}
              style={{
                flex: 1,
                padding: '15px',
                background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              🎮 Iniciar Juego
            </button>
          ) : (
            <button
              onClick={startGame}
              style={{
                flex: 1,
                padding: '15px',
                background: 'white',
                color: '#f5576c',
                border: '2px solid #f5576c',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#f5576c';
                e.target.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#f5576c';
              }}
            >
              🔄 Reiniciar
            </button>
          )}
          
          <button
            onClick={() => window.location.href = '/'}
            style={{
              flex: 1,
              padding: '15px',
              background: 'rgba(255,255,255,0.95)',
              color: '#f093fb',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#f093fb';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.95)';
              e.target.style.color = '#f093fb';
            }}
          >
            🏠 Volver al Menú
          </button>
        </div>

        {/* Modal de Game Over */}
        {gameOver && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: '40px',
              textAlign: 'center',
              maxWidth: '400px'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>
                {score > 500 ? '🎉' : '😅'}
              </div>
              <h2 style={{ color: '#f5576c', marginBottom: '10px' }}>
                {score > 500 ? '¡Excelente!' : '¡Buen intento!'}
              </h2>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                Llegaste al nivel <strong>{level}</strong> en <strong>{formatTime(time)}</strong>
              </p>
              <p style={{ fontSize: '32px', color: '#f093fb', fontWeight: 'bold', marginBottom: '30px' }}>
                {score} puntos
              </p>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button
                  onClick={startGame}
                  style={{
                    flex: 1,
                    padding: '15px',
                    background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Jugar de nuevo
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  style={{
                    flex: 1,
                    padding: '15px',
                    background: '#e2e8f0',
                    color: '#f5576c',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Menú principal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}