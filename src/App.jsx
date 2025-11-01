import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import MemoryGame from "./pages/MemoryGame";
import SequenceGame from "./pages/SequenceGame";
import SpatialMemoryGame from "./pages/SpatialMemoryGame";

export default function App() {
  const [usuario, setUsuario] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            usuario ? <Home usuario={usuario} /> : <Navigate to="/login" replace />
          }
        />

        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login onLogin={setUsuario} />} />
        
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
      </Routes>
    </Router>
  );
}
