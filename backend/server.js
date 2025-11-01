// backend/server.js
import express from "express";
import cors from "cors";
import connection from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ REGISTRO DE USUARIO
app.post("/register", (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  connection.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Error en el servidor" });
      if (results.length > 0) {
        return res.status(400).json({ error: "El usuario ya existe" });
      }

      connection.query(
        "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
        [nombre, email, password],
        (err, result) => {
          if (err) return res.status(500).json({ error: "Error al registrar" });
          
          // Crear estadísticas iniciales para el usuario
          connection.query(
            "INSERT INTO estadisticas (usuario_id) VALUES (?)",
            [result.insertId],
            (err2) => {
              if (err2) console.error("Error al crear estadísticas:", err2);
            }
          );

          res.json({ message: "Usuario registrado con éxito", id: result.insertId });
        }
      );
    }
  );
});

// ✅ LOGIN DE USUARIO
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "SELECT * FROM usuarios WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Error en el servidor" });

      if (results.length === 0) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
      }

      res.json({
        message: "Inicio de sesión exitoso",
        usuario: results[0],
      });
    }
  );
});

// ✅ GUARDAR PARTIDA
app.post("/partidas", (req, res) => {
  const { usuario_id, juego_tipo, nivel, puntaje, tiempo_segundos } = req.body;

  if (!usuario_id || !juego_tipo || !nivel || puntaje === undefined) {
    return res.status(400).json({ error: "Faltan datos de la partida" });
  }

  connection.query(
    "INSERT INTO partidas (usuario_id, juego_tipo, nivel, puntaje, tiempo_segundos) VALUES (?, ?, ?, ?, ?)",
    [usuario_id, juego_tipo, nivel, puntaje, tiempo_segundos],
    (err, result) => {
      if (err) {
        console.error("Error al guardar partida:", err);
        return res.status(500).json({ error: "Error al guardar partida" });
      }

      // Actualizar estadísticas
      connection.query(
        "UPDATE estadisticas SET juegos_jugados = juegos_jugados + 1, mejor_puntaje = GREATEST(mejor_puntaje, ?) WHERE usuario_id = ?",
        [puntaje, usuario_id],
        (err2) => {
          if (err2) console.error("Error al actualizar estadísticas:", err2);
        }
      );

      res.json({ message: "Partida guardada con éxito", id: result.insertId });
    }
  );
});

// ✅ OBTENER ESTADÍSTICAS DEL USUARIO
app.get("/estadisticas/:usuario_id", (req, res) => {
  const { usuario_id } = req.params;

  connection.query(
    "SELECT * FROM estadisticas WHERE usuario_id = ?",
    [usuario_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Error en el servidor" });
      
      if (results.length === 0) {
        return res.status(404).json({ error: "Estadísticas no encontradas" });
      }

      res.json(results[0]);
    }
  );
});

// ✅ OBTENER HISTORIAL DE PARTIDAS
app.get("/partidas/:usuario_id", (req, res) => {
  const { usuario_id } = req.params;

  connection.query(
    "SELECT * FROM partidas WHERE usuario_id = ? ORDER BY fecha DESC LIMIT 10",
    [usuario_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Error en el servidor" });
      res.json(results);
    }
  );
});

const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));

