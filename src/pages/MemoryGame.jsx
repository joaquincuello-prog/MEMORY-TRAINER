import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';
import TutorialModal from '../components/TutorialModal';
import LoadingScreen from '../components/LoadingScreen';
import soundManager from '../utils/soundManager';
import SoundToggle from '../components/SoundToggle';

// Emojis para las cartas
const EMOJIS = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🍒', '🍑'];

export default function MemoryGame({ usuario, onGameEnd }) {
  const [showLoading, setShowLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const navigate = useNavigate();

  // Mostrar tutorial solo la primera vez
  useEffect(() => {
    const tutorialSeen = localStorage.getItem('tutorial_memoria_cartas_seen');
    if (!tutorialSeen) {
      setShowTutorial(true);
      localStorage.setItem('tutorial_memoria_cartas_seen', 'true');
    }
  }, []);

  // Inicializar el juego
  useEffect(() => {
    initGame();
  }, []);

  // Temporizador
  useEffect(() => {
    let interval;
    if (gameStarted && !gameOver) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
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
    soundManager.click(); // ✅ Sonido al hacer click

    if (!gameStarted) setGameStarted(true);
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(clickedCard.id) ||
      matchedCards.includes(clickedCard.id)
    ) return;

    const newFlipped = [...flippedCards, clickedCard.id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard.emoji === secondCard.emoji) {
        soundManager.success(); // ✅ Sonido de éxito
        setMatchedCards([...matchedCards, firstId, secondId]);
        setFlippedCards([]);
      } else {
        soundManager.error(); // ❌ Sonido de error
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  const handleGameEnd = async () => {
    soundManager.victory(); // 🎉 Sonido de victoria
    const puntaje = Math.max(1000 - (moves * 10) - time, 0);
    try {
      await fetch('http://localhost:3001/partidas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: usuario.id,
          juego_tipo: 'memoria_cartas',
          nivel: 'facil',
          puntaje,
          tiempo_segundos: time
        })
      });
      if (onGameEnd) onGameEnd(puntaje);
    } catch (error) {
      console.error('Error al guardar partida:', error);
    }
  };

  const handleExitClick = () => {
    if (gameStarted && !gameOver && moves > 0) {
      setShowExitModal(true);
    } else {
      navigate('/');
    }
  };

  const confirmExit = () => {
    setShowExitModal(false);
    navigate('/');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Pantalla de carga */}
      {showLoading && (
        <LoadingScreen
          gameIcon="🎴"
          gameName="Memoria de Cartas"
          onLoadComplete={() => setShowLoading(false)}
        />
      )}

      {!showLoading && (
        <div
          style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* ✅ Botón de sonido */}
          <SoundToggle />

          <div style={{ maxWidth: '800px', width: '100%' }}>
            {/* Header */}
            <div
              style={{
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
              }}
            >
              <h1 style={{ margin: 0, color: '#667eea', fontSize: '28px' }}>🎴 Memoria de Cartas</h1>
              <p style={{ margin: '10px 0 0 0', color: '#666' }}>Nivel Fácil - Encuentra todos los pares</p>
            </div>

            {/* Estadísticas */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '15px',
                marginBottom: '20px'
              }}
            >
              <div style={statCardStyle}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>{moves}</div>
                <div style={statTextStyle}>Movimientos</div>
              </div>

              <div style={statCardStyle}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#764ba2' }}>{formatTime(time)}</div>
                <div style={statTextStyle}>Tiempo</div>
              </div>

              <div style={statCardStyle}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#48bb78' }}>
                  {matchedCards.length / 2}/{cards.length / 2}
                </div>
                <div style={statTextStyle}>Pares encontrados</div>
              </div>
            </div>

            {/* Tablero */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '15px',
                marginBottom: '20px'
              }}
            >
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
                style={primaryButton}
                onMouseOver={(e) => (e.target.style.background = '#667eea', e.target.style.color = 'white')}
                onMouseOut={(e) => (e.target.style.background = 'white', e.target.style.color = '#667eea')}
              >
                🔄 Reiniciar Juego
              </button>

              <button
                onClick={handleExitClick}
                style={secondaryButton}
                onMouseOver={(e) => (e.target.style.background = '#764ba2', e.target.style.color = 'white')}
                onMouseOut={(e) => (e.target.style.background = 'rgba(255,255,255,0.95)', e.target.style.color = '#764ba2')}
              >
                🏠 Volver al Menú
              </button>
            </div>

            {/* Modal de confirmación al salir */}
            <ConfirmModal
              show={showExitModal}
              title="¿Salir del juego?"
              message="Perderás el progreso de esta partida"
              onConfirm={confirmExit}
              onCancel={() => setShowExitModal(false)}
            />
          </div>

          {/* Modal del tutorial */}
          {showTutorial && (
            <TutorialModal
              gameType="memoria_cartas"
              onClose={() => setShowTutorial(false)}
            />
          )}

          {/* Botón para volver a ver el tutorial */}
          <button
            onClick={() => setShowTutorial(true)}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              fontSize: '24px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              zIndex: 100
            }}
          >
            ❓
          </button>
        </div>
      )}
    </>
  );
}

// Estilos reutilizables
const statCardStyle = {
  background: 'rgba(255,255,255,0.95)',
  borderRadius: '12px',
  padding: '15px',
  textAlign: 'center',
  boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
};

const statTextStyle = {
  fontSize: '14px',
  color: '#666',
  marginTop: '5px'
};

const primaryButton = {
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
};

const secondaryButton = {
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
};

