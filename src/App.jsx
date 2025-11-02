import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/home";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import MemoryGame from "./pages/MemoryGame";
import SequenceGame from "./pages/SequenceGame";
import SpatialMemoryGame from "./pages/SpatialMemoryGame";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setLoading(false);
  }, []);

  // ✅ Guardar usuario en localStorage cuando cambia
  const handleLogin = (user) => {
    setUsuario(user);
    localStorage.setItem('usuario', JSON.stringify(user));
  };

  // ✅ Función para cerrar sesión
  const handleLogout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ fontSize: '64px', animation: 'pulse 1.5s infinite' }}>🧠</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            usuario ? <Home usuario={usuario} onLogout={handleLogout} /> : <Navigate to="/login" replace />
          }
        />

        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        
        <Route
          path="/juego/memoria-cartas"
          element={
            usuario ? <MemoryGame usuario={usuario} /> : <Navigate to="/login" replace />
          }
        />
        
        <Route
          path="/juego/secuencia-numeros"
          element={
            usuario ? <SequenceGame usuario={usuario} /> : <Navigate to="/login" replace />
          }
        />
        
        <Route
          path="/juego/memoria-espacial"
          element={
            usuario ? <SpatialMemoryGame usuario={usuario} /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/dashboard"
          element={
            usuario ? <Dashboard usuario={usuario} /> : <Navigate to="/login" replace />
          }
        />

        {/* ✅ Página 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}