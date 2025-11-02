import { useNavigate } from "react-router-dom";

export default function Home({ usuario, onLogout }) {
  const navigate = useNavigate();

  // 🔹 Maneja el cierre de sesión con confirmación y navegación interna
  const handleLogout = () => {
    if (window.confirm("¿Estás seguro que deseas cerrar sesión?")) {
      onLogout();
      navigate("/login");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0f7fa, #80deea)",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "800px", width: "100%" }}>
        {/* Encabezado */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "30px",
            marginBottom: "30px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#00796b", fontSize: "32px", margin: 0 }}>
            ¡Bienvenido, {usuario.nombre}! 👋
          </h2>
          <p style={{ color: "#666", marginTop: "10px" }}>
            Selecciona un juego para entrenar tu memoria
          </p>
        </div>

        {/* ✅ Botón para ir al Dashboard */}
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            width: "100%",
            padding: "20px",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            border: "none",
            borderRadius: "16px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "30px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            transition: "transform 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.transform = "translateY(-3px)")}
          onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
        >
          📊 Ver Dashboard y Estadísticas
        </button>

        {/* Juegos */}
        <div style={{ display: "grid", gap: "20px" }}>
          {/* Juego Fácil */}
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "30px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "transform 0.3s ease",
            }}
            onClick={() => navigate("/juego/memoria-cartas")}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>🎴</div>
            <h3 style={{ color: "#00796b", margin: "0 0 10px 0" }}>
              Memoria de Cartas
            </h3>
            <p style={{ color: "#666", margin: "0 0 15px 0" }}>
              Encuentra todos los pares de cartas idénticas
            </p>
            <span
              style={{
                display: "inline-block",
                background: "#c8e6c9",
                color: "#2e7d32",
                padding: "5px 15px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              Fácil
            </span>
          </div>

          {/* Juego Intermedio */}
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "30px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "transform 0.3s ease",
            }}
            onClick={() => navigate("/juego/secuencia-numeros")}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>🔢</div>
            <h3 style={{ color: "#00796b", margin: "0 0 10px 0" }}>
              Secuencia de Números
            </h3>
            <p style={{ color: "#666", margin: "0 0 15px 0" }}>
              Memoriza y repite la secuencia mostrada
            </p>
            <span
              style={{
                display: "inline-block",
                background: "#fff9c4",
                color: "#f57f17",
                padding: "5px 15px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              Intermedio
            </span>
          </div>

          {/* Juego Difícil */}
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "30px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "transform 0.3s ease",
            }}
            onClick={() => navigate("/juego/memoria-espacial")}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>🧩</div>
            <h3 style={{ color: "#00796b", margin: "0 0 10px 0" }}>
              Memoria Espacial
            </h3>
            <p style={{ color: "#666", margin: "0 0 15px 0" }}>
              Recuerda la posición exacta de los objetos
            </p>
            <span
              style={{
                display: "inline-block",
                background: "#ffcdd2",
                color: "#c62828",
                padding: "5px 15px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              Difícil
            </span>
          </div>
        </div>

        {/* 🔹 Botón de cerrar sesión mejorado */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: "30px",
            width: "100%",
            padding: "15px",
            background: "white",
            color: "#f56565",
            border: "2px solid #f56565",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#f56565";
            e.target.style.color = "white";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "white";
            e.target.style.color = "#f56565";
          }}
        >
          🚪 Cerrar sesión
        </button>
      </div>
    </div>
  );
}
