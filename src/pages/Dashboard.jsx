import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ usuario }) {
  const navigate = useNavigate();
  const [estadisticas, setEstadisticas] = useState(null);
  const [partidas, setPartidas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Obtener estadísticas generales
      const resEstadisticas = await fetch(`http://localhost:3001/estadisticas/${usuario.id}`);
      const dataEstadisticas = await resEstadisticas.json();
      setEstadisticas(dataEstadisticas);

      // Obtener historial de partidas
      const resPartidas = await fetch(`http://localhost:3001/partidas/${usuario.id}`);
      const dataPartidas = await resPartidas.json();
      setPartidas(dataPartidas);

      setLoading(false);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      setLoading(false);
    }
  };

  const getJuegoIcon = (tipo) => {
    switch (tipo) {
      case 'memoria_cartas': return '🎴';
      case 'secuencia_numeros': return '🔢';
      case 'memoria_espacial': return '🧩';
      default: return '🎮';
    }
  };

  const getJuegoNombre = (tipo) => {
    switch (tipo) {
      case 'memoria_cartas': return 'Memoria de Cartas';
      case 'secuencia_numeros': return 'Secuencia de Números';
      case 'memoria_espacial': return 'Memoria Espacial';
      default: return 'Juego';
    }
  };

  const getNivelColor = (nivel) => {
    switch (nivel) {
      case 'facil': return '#48bb78';
      case 'intermedio': return '#ed8936';
      case 'dificil': return '#f56565';
      default: return '#667eea';
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Calcular estadísticas por juego
  const getJuegoStats = () => {
    const stats = {};
    partidas.forEach(p => {
      if (!stats[p.juego_tipo]) {
        stats[p.juego_tipo] = { jugadas: 0, mejorPuntaje: 0 };
      }
      stats[p.juego_tipo].jugadas++;
      stats[p.juego_tipo].mejorPuntaje = Math.max(
        stats[p.juego_tipo].mejorPuntaje,
        p.puntaje
      );
    });
    return stats;
  };

  const juegoStats = getJuegoStats();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ fontSize: '48px', animation: 'pulse 1.5s infinite' }}>
          📊
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ margin: 0, color: '#667eea', fontSize: '32px' }}>
              📊 Dashboard
            </h1>
            <p style={{ margin: '10px 0 0 0', color: '#666', fontSize: '16px' }}>
              Hola {usuario.nombre}, aquí está tu progreso
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '12px 24px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#764ba2'}
            onMouseOut={(e) => e.target.style.background = '#667eea'}
          >
            🏠 Volver al Menú
          </button>
        </div>

        {/* Estadísticas Generales */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '16px',
            padding: '25px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎮</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#667eea' }}>
              {estadisticas?.juegos_jugados || 0}
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
              Partidas jugadas
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '16px',
            padding: '25px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🏆</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#f5576c' }}>
              {estadisticas?.mejor_puntaje || 0}
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
              Mejor puntaje
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '16px',
            padding: '25px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>⭐</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ffd700' }}>
              {Math.floor((estadisticas?.mejor_puntaje || 0) / 100)}
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
              Nivel de maestría
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '16px',
            padding: '25px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🔥</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ed8936' }}>
              {partidas.length > 0 ? Math.max(...partidas.map(p => p.puntaje)) : 0}
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
              Record personal
            </div>
          </div>
        </div>

        {/* Estadísticas por Juego */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: '0 0 20px 0', color: '#667eea', fontSize: '24px' }}>
            📈 Estadísticas por Juego
          </h2>
          
          {Object.keys(juegoStats).length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎮</div>
              <p style={{ fontSize: '18px' }}>
                Aún no has jugado ninguna partida
              </p>
              <button
                onClick={() => navigate('/')}
                style={{
                  marginTop: '20px',
                  padding: '12px 24px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                ¡Jugar ahora!
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {Object.entries(juegoStats).map(([tipo, stats]) => (
                <div key={tipo} style={{
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                  borderRadius: '12px',
                  padding: '20px',
                  transition: 'transform 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>
                    {getJuegoIcon(tipo)}
                  </div>
                  <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '18px' }}>
                    {getJuegoNombre(tipo)}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: '#666' }}>Partidas:</span>
                    <span style={{ fontWeight: 'bold', color: '#667eea' }}>
                      {stats.jugadas}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>Mejor puntaje:</span>
                    <span style={{ fontWeight: 'bold', color: '#f5576c' }}>
                      {stats.mejorPuntaje}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Historial de Partidas */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: '0 0 20px 0', color: '#667eea', fontSize: '24px' }}>
            📜 Últimas 10 Partidas
          </h2>
          
          {partidas.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
              <p style={{ fontSize: '18px' }}>No hay partidas registradas</p>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              {partidas.map((partida, index) => (
                <div key={partida.id} style={{
                  background: index % 2 === 0 ? '#f7fafc' : 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s ease',
                  border: '1px solid #e2e8f0'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateX(5px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
                    <div style={{ fontSize: '32px' }}>
                      {getJuegoIcon(partida.juego_tipo)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#333', fontSize: '16px' }}>
                        {getJuegoNombre(partida.juego_tipo)}
                      </div>
                      <div style={{ fontSize: '13px', color: '#666', marginTop: '5px' }}>
                        {formatFecha(partida.fecha)}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '12px', color: '#666' }}>Nivel</div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: getNivelColor(partida.nivel),
                        textTransform: 'capitalize'
                      }}>
                        {partida.nivel}
                      </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '12px', color: '#666' }}>Tiempo</div>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#667eea' }}>
                        {formatTime(partida.tiempo_segundos)}
                      </div>
                    </div>

                    <div style={{
                      background: 'linear-gradient(135deg, #f5576c, #f093fb)',
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      minWidth: '80px',
                      textAlign: 'center'
                    }}>
                      {partida.puntaje}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Progreso y Logros */}
        <div style={{
          marginTop: '20px',
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: '0 0 20px 0', color: '#667eea', fontSize: '24px' }}>
            🏅 Logros Desbloqueados
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {/* Logro 1 */}
            <div style={{
              background: estadisticas?.juegos_jugados >= 1 
                ? 'linear-gradient(135deg, #ffd89b, #19547b)' 
                : '#e2e8f0',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
              color: estadisticas?.juegos_jugados >= 1 ? 'white' : '#999',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => {
              if (estadisticas?.juegos_jugados >= 1) {
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎮</div>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                Primera Partida
              </div>
              <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.8 }}>
                Juega tu primera partida
              </div>
            </div>

            {/* Logro 2 */}
            <div style={{
              background: estadisticas?.juegos_jugados >= 10 
                ? 'linear-gradient(135deg, #48bb78, #38a169)' 
                : '#e2e8f0',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
              color: estadisticas?.juegos_jugados >= 10 ? 'white' : '#999',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => {
              if (estadisticas?.juegos_jugados >= 10) {
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>🔥</div>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                Entusiasta
              </div>
              <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.8 }}>
                Juega 10 partidas
              </div>
            </div>

            {/* Logro 3 */}
            <div style={{
              background: estadisticas?.mejor_puntaje >= 500 
                ? 'linear-gradient(135deg, #f093fb, #f5576c)' 
                : '#e2e8f0',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
              color: estadisticas?.mejor_puntaje >= 500 ? 'white' : '#999',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => {
              if (estadisticas?.mejor_puntaje >= 500) {
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>⭐</div>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                Profesional
              </div>
              <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.8 }}>
                Consigue 500 puntos
              </div>
            </div>

            {/* Logro 4 */}
            <div style={{
              background: estadisticas?.mejor_puntaje >= 1000 
                ? 'linear-gradient(135deg, #ffd700, #ff8c00)' 
                : '#e2e8f0',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
              color: estadisticas?.mejor_puntaje >= 1000 ? 'white' : '#999',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => {
              if (estadisticas?.mejor_puntaje >= 1000) {
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>🏆</div>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                Maestro
              </div>
              <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.8 }}>
                Consigue 1000 puntos
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}