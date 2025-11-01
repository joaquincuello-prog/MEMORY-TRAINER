import { useState, useEffect } from 'react';

// Emojis para las cartas
const EMOJIS = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🍒', '🍑'];

export default function MemoryGame({ usuario, onGameEnd }) {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Inicializar el juego
  useEffect(() => {
    initGame();
  }, []);

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

  // Verificar si ganó
  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameOver(true);
      setGameStarted(false);
      handleGameEnd();
    }
  }, [matchedCards, cards]);

  const initGame = () => {
    // Crear pares de cartas
    const gameCards = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));
    
    setCards(gameCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
    setGameStarted(false);
    setGameOver(false);
  };

  const handleCardClick = (clickedCard) => {
    if (!gameStarted) setGameStarted(true);
    
    // No hacer nada si ya está volteada o ya hay 2 cartas volteadas
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(clickedCard.id) ||
      matchedCards.includes(clickedCard.id)
    ) {
      return;
    }

    const newFlipped = [...flippedCards, clickedCard.id];
    setFlippedCards(newFlipped);

    // Si hay 2 cartas volteadas, verificar si coinciden
    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard.emoji === secondCard.emoji) {
        // ¡Match! 🎉
        setMatchedCards([...matchedCards, firstId, secondId]);
        setFlippedCards([]);
      } else {
        // No coinciden, voltear de nuevo después de 1 segundo
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleGameEnd = async () => {
    // Calcular puntaje (menos movimientos y menos tiempo = mejor puntaje)
    const puntaje = Math.max(1000 - (moves * 10) - time, 0);

    try {
      await fetch('http://localhost:3001/partidas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: usuario.id,
          juego_tipo: 'memoria_cartas',
          nivel: 'facil',
          puntaje: puntaje,
          tiempo_segundos: time
        })
      });
      
      if (onGameEnd) onGameEnd(puntaje);
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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{
        maxWidth: '800px',
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
          <h1 style={{ margin: 0, color: '#667eea', fontSize: '28px' }}>
            🎴 Memoria de Cartas
          </h1>
          <p style={{ margin: '10px 0 0 0', color: '#666' }}>
            Nivel Fácil - Encuentra todos los pares
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
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
              {moves}
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
              Movimientos
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '12px',
            padding: '15px',
            textAlign: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#764ba2' }}>
              {formatTime(time)}
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
              Tiempo
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
              {matchedCards.length / 2}/{cards.length / 2}
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
              Pares encontrados
            </div>
          </div>
        </div>

        {/* Tablero de juego */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '15px',
          marginBottom: '20px'
        }}>
          {cards.map(card => {
            const isFlipped = flippedCards.includes(card.id) || matchedCards.includes(card.id);
            const isMatched = matchedCards.includes(card.id);
            
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                style={{
                  aspectRatio: '1',
                  background: isMatched 
                    ? 'linear-gradient(135deg, #48bb78, #38a169)' 
                    : isFlipped 
                    ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                    : 'rgba(255,255,255,0.95)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  cursor: isMatched ? 'default' : 'pointer',
                  transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  userSelect: 'none'
                }}
              >
                {isFlipped ? card.emoji : '❓'}
              </div>
            );
          })}
        </div>

        {/* Botones */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            onClick={initGame}
            style={{
              flex: 1,
              padding: '15px',
              background: 'white',
              color: '#667eea',
              border: '2px solid #667eea',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#667eea';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'white';
              e.target.style.color = '#667eea';
            }}
          >
            🔄 Reiniciar Juego
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            style={{
              flex: 1,
              padding: '15px',
              background: 'rgba(255,255,255,0.95)',
              color: '#764ba2',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#764ba2';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.95)';
              e.target.style.color = '#764ba2';
            }}
          >
            🏠 Volver al Menú
          </button>
        </div>

        {/* Modal de victoria */}
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
              maxWidth: '400px',
              animation: 'bounce 0.5s ease'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎉</div>
              <h2 style={{ color: '#667eea', marginBottom: '10px' }}>
                ¡Felicitaciones!
              </h2>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                Completaste el juego en <strong>{moves} movimientos</strong> y <strong>{formatTime(time)}</strong>
              </p>
              <p style={{ fontSize: '24px', color: '#48bb78', fontWeight: 'bold', marginBottom: '30px' }}>
                Puntaje: {Math.max(1000 - (moves * 10) - time, 0)}
              </p>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button
                  onClick={initGame}
                  style={{
                    flex: 1,
                    padding: '15px',
                    background: '#667eea',
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
                    color: '#667eea',
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