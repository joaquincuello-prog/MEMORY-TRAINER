import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";


export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        onLogin(data.usuario);
        navigate("/");
      } else {
        alert(data.error || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>🧠 Entrenador de Memoria</h1>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Entrar</button>
      </form>
      <p>
        ¿No tienes cuenta? <Link to="/registro">Registrate</Link>
      </p>
    </div>
  );
}
