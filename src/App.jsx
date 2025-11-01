import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/home";
import Registro from "./pages/Registro";
import Login from "./pages/Login";

export default function App() {
  const [usuario, setUsuario] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Página principal (solo si hay usuario logueado) */}
        <Route
          path="/"
          element={
            usuario ? <Home usuario={usuario} /> : <Navigate to="/login" replace />
          }
        />

        {/* Página de registro */}
        <Route path="/registro" element={<Registro />} />

        {/* Página de login */}
        <Route path="/login" element={<Login onLogin={setUsuario} />} />
      </Routes>
    </Router>
  );
}

