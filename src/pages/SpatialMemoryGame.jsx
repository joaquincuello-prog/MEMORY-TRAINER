import { useState, useEffect } from 'react';

export default function SpatialMemoryGame({ usuario, onGameEnd }) {
  const [gridSize] = useState(5); // Grid 5x5
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [targetPositions, setTargetPositions] = useState([]);
  const [userSelections, setUserSelections] = useState([]);
  const [showTargets, setShowTargets] = useState(false);
  const [gamePhase, setGamePhase] = useState('start'); // start, memorize, recall, result
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const [message, setMessage] = useState('¡Presiona INICIAR para comenzar!');
  const [mistakes, setMistakes] = useState(0);

  const emojis = ['⭐', '💎', '🎯', '🔥', '💫', '🌟', '✨', '🎨'];

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
    setLevel(1);
    setScore(0);
    setMistakes(0);
    setTime(0);
    setGameStarted(true);
    setGameOver(false);
    startNewRound(1);
  };

  const startNewRound = (currentLevel) => {
    setUserSelections([]);
    setGamePhase('memorize');
    setMessage('¡Memoriza las posiciones!');
    
    // Generar posiciones aleatorias (cantidad aumenta con el nivel)
    const numTargets = Math.min(2 + currentLevel, 10);
    const positions = [];
    
    while (positions.length < numTargets) {
      const pos = Math.floor(Math.random() * (gridSize * gridSize));
      if (!positions.includes(pos)) {
        positions.push(pos);
      }
    }
    
    setTargetPositions(positions);
    setShowTargets(true);

    // Ocultar después de 3 segundos (menos tiempo en niveles altos)
    const memoryTime = Math.max(2000, 4000 - (currentLevel * 100));
    setTimeout(() => {
      setShowTargets(false);
      setGamePhase('recall');
      setMessage('¡Selecciona las posiciones que recuerdas!');
    }, memoryTime);
  };

  const handleCellClick = (index) => {
    if (gamePhase !== 'recall' || gameOver) return;

    // No permitir seleccionar la misma celda dos veces
    if (userSelections.includes(index)) return;

    const newSelections = [...userSelections, index];
    setUserSelections(newSelections);

    // Verificar si la selección es correcta
    if (!targetPositions.includes(index)) {
      // Error
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      
      if (newMistakes >= 3) {
        // Game Over
        setGameOver(true);
        setGameStarted(false);
        setGamePhase('result');
        setMessage('¡Demasiados errores! Juego terminado');
        handleGameEnd();
        return;
      }
    }

    // Verificar si completó el nivel
    if (newSelections.length === targetPositions.length) {
      checkRoundCompletion(newSelections);
    }
  };

  const checkRoundCompletion = (selections) => {
    // Contar aciertos
    const correctSelections = selections.filter(sel => 
      targetPositions.includes(sel)
    ).length;

    const accuracy = (correctSelections / targetPositions.length) * 100;

    if (accuracy >= 80) {
      // ¡Nivel completado!
      const levelScore = level * 150;
      setScore(score + levelScore);
      setLevel(level + 1);
      setGamePhase('result');
      setMessage('¡Excelente! Siguiente nivel...');
      setShowTargets(true); // Mostrar respuestas correctas

      setTimeout(() => {
        startNewRound(level + 1);
      }, 2000);
    } else {
      // No completó el nivel
      setGameOver(true);
      setGameStarted(false);
      setGamePhase('result');
      setShowTargets(true);
      setMessage(`Precisión: ${accuracy.toFixed(0)}% - Necesitas 80% para continuar`);
      handleGameEnd();
    }
  };

  const handleGameEnd = async () => {
    try {
      await fetch('http://localhost:3001/partidas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: usuario.id,
          juego_tipo: 'memoria_espacial',
          nivel: 'dificil',
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

  const getCellStatus = (index) => {
    const isTarget = targetPositions.includes(index);
    const isSelected = userSelections.includes(index);
    const isCorrect = isTarget && isSelected;
    const isWrong = !isTarget && isSelected;

    if (gamePhase === 'memorize' && showTargets && isTarget) {
      return 'target';
    }
    if (gamePhase === 'recall' && isSelected) {
      return isTarget ? 'correct' : 'wrong';
    }
    if (gamePhase === 'result') {
      if (isCorrect) return 'correct';
      if (isWrong) return 'wrong';
      if (isTarget) return 'missed';
    }
    return 'default';
  };

  const getCellStyle = (status) => {
    const baseStyle = {
      aspectRatio: '1',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '28px',
      cursor: gamePhase === 'recall' ? 'pointer' : 'default',
      transition: 'all 0.3s ease',
      userSelect: 'none'
    };

    switch (status) {
      case 'target':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #ffd89b, #19547b)',
          boxShadow: '0 4px 16px rgba(255,216,155,0.5)',
          transform: 'scale(1.05)'
        };
      case 'correct':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #48bb78, #38a169)',
          boxShadow: '0 4px 16px rgba(72,187,120,0.5)'
        };
      case 'wrong':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #f56565, #c53030)',
          boxShadow: '0 4px 16px rgba(245,101,101,0.5)'
        };
      case 'missed':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #fbd38d, #ed8936)',
          boxShadow: '0 4px 16px rgba(251,211,141,0.5)'
        };
      default:
        return {
          ...baseStyle,
          background: 'rgba(255,255,255,0.8)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        };
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{
        maxWidth: '700px',
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
          <h1 style={{ margin: 0, color: '#fa709a', fontSize: '28px' }}>
            🧩 Memoria Espacial
          </h1>
          <p style={{ margin: '10px 0 0 0', color: '#666' }}>
            Nivel Difícil - Recuerda la posición de todos los objetos
          </p>
        </div>

        {/* Estadísticas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
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
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fa709a' }}>
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
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fee140' }}>
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
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f56565' }}>
              {mistakes}/3
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
              Errores
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

        {/* Mensaje */}
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
            color: gameOver ? '#f56565' : '#333',
            fontWeight: 'bold'
          }}>
            {message}
          </p>
          {gamePhase === 'recall' && (
            <p style={{ margin: '10px 0 0 0', color: '#666', fontSize: '14px' }}>
              Seleccionadas: {userSelections.length} / {targetPositions.length}
            </p>
          )}
        </div>

        {/* Grid de juego */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gap: '10px'
          }}>
            {Array.from({ length: gridSize * gridSize }).map((_, index) => {
              const status = getCellStatus(index);
              const isTarget = targetPositions.includes(index);
              
              return (
                <div
                  key={index}
                  onClick={() => handleCellClick(index)}
                  style={getCellStyle(status)}
                  onMouseOver={(e) => {
                    if (gamePhase === 'recall' && !userSelections.includes(index)) {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (gamePhase === 'recall') {
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {status === 'target' && emojis[Math.floor(Math.random() * emojis.length)]}
                  {status === 'correct' && '✓'}
                  {status === 'wrong' && '✗'}
                  {status === 'missed' && '?'}
                </div>
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
                background: 'linear-gradient(135deg, #fa709a, #fee140)',
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
                color: '#fa709a',
                border: '2px solid #fa709a',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#fa709a';
                e.target.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#fa709a';
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
              color: '#fee140',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#fee140';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.95)';
              e.target.style.color = '#fee140';
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
                {score > 500 ? '🎉' : '💪'}
              </div>
              <h2 style={{ color: '#fa709a', marginBottom: '10px' }}>
                {score > 500 ? '¡Impresionante!' : '¡Buen intento!'}
              </h2>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                Llegaste al nivel <strong>{level}</strong> en <strong>{formatTime(time)}</strong>
              </p>
              <p style={{ fontSize: '32px', color: '#fee140', fontWeight: 'bold', marginBottom: '30px' }}>
                {score} puntos
              </p>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button
                  onClick={startGame}
                  style={{
                    flex: 1,
                    padding: '15px',
                    background: 'linear-gradient(135deg, #fa709a, #fee140)',
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
                    color: '#fa709a',
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