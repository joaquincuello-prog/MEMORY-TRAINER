// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Home from "./pages/home";


export default function App() {
  const [usuario, setUsuario] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Página de inicio (si no hay usuario, redirige a login) */}
        <Route
          path="/"
          element={
            usuario ? <Home usuario={usuario} /> : <Navigate to="/login" />
          }
        />

        {/* Registro */}
        <Route path="/registro" element={<Registro />} />

        {/* Login */}
        <Route path="/login" element={<Login onLogin={setUsuario} />} />
      </Routes>
    </Router>
  );
}
