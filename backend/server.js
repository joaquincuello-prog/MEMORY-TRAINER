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

  // Verificar si el usuario ya existe
  connection.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Error en el servidor" });
      if (results.length > 0) {
        return res.status(400).json({ error: "El usuario ya existe" });
      }

      // Insertar nuevo usuario
      connection.query(
        "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
        [nombre, email, password],
        (err, result) => {
          if (err) return res.status(500).json({ error: "Error al registrar" });
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

const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));

