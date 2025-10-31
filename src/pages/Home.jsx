export default function Home({ usuario }) {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Bienvenido, {usuario.nombre || usuario.email}</h2>
      <h3>Selecciona un nivel o tipo de juego</h3>
      <button>Memoria fácil</button>
      <button>Intermedio</button>
      <button>Difícil</button>
    </div>
  );
}