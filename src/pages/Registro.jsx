import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigate("/login");
      } else {
        alert(data.error || "Error al registrar usuario");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>🧠 Entrenador de Memoria</h1>
      <h2>Registro de usuario</h2>
      <form onSubmit={handleRegistro}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        /><br /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">Registrar</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </div>
  );
}
