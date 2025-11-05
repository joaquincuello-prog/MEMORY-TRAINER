# 🧠 Memory Trainer

> **Aplicación web interactiva para entrenar y mejorar la memoria a través de juegos cognitivos**

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![Node](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Características Principales](#-características-principales)
- [Beneficios](#-beneficios)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Modelo de Datos](#-modelo-de-datos)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Juegos Disponibles](#-juegos-disponibles)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Contribución](#-contribución)
- [Licencia](#-licencia)
- [Autores](#-autores)

---

## 🎯 Descripción del Proyecto

**Memory Trainer** es una aplicación web educativa diseñada para ayudar a personas de todas las edades a ejercitar y mejorar su capacidad de memoria a través de juegos interactivos y desafiantes. La aplicación ofrece tres niveles de dificultad progresiva, cada uno enfocado en diferentes aspectos de la memoria cognitiva.

### ¿Para quién es esta aplicación?

- 👨‍🎓 **Estudiantes** que buscan mejorar su concentración y retención
- 👵 **Adultos mayores** que desean mantener su mente activa
- 🧑‍💼 **Profesionales** que quieren optimizar su agilidad mental
- 👨‍👩‍👧‍👦 **Familias** que buscan actividades educativas y divertidas

---

## ✨ Características Principales

### 🎮 Sistema de Juegos Multinivel

- **3 juegos con dificultad progresiva**: Fácil, Intermedio y Difícil
- **Mecánicas de juego variadas**: Memoria visual, secuencial y espacial
- **Sistema de puntuación**: Basado en desempeño, tiempo y precisión
- **Progresión de dificultad**: Niveles que se adaptan al jugador

### 📊 Sistema de Estadísticas Completo

- **Dashboard personalizado** con métricas detalladas
- **Historial de partidas** con fecha, tiempo y puntaje
- **Sistema de logros** desbloqueables
- **Gráficos por tipo de juego** para seguir tu progreso

### 🎨 Experiencia de Usuario Premium

- **Modo Oscuro/Claro**: Adaptable a tus preferencias
- **Tutorial interactivo**: Aprende a jugar con guías paso a paso
- **Sistema de sonidos**: Feedback auditivo para cada acción
- **Animaciones fluidas**: Transiciones suaves y profesionales
- **Diseño responsive**: Funciona en computadora, tablet y móvil

### 🔐 Gestión de Usuarios

- **Sistema de registro y autenticación**
- **Persistencia de sesión**: No pierdas tu progreso
- **Perfil personalizado**: Cada usuario tiene su propio progreso
- **Guardado automático**: Todas tus partidas se registran

---

## 🎁 Beneficios

### Para la Salud Cognitiva

✅ **Mejora la concentración** - Ejercita tu capacidad de atención sostenida  
✅ **Fortalece la memoria** - Aumenta tu capacidad de retención  
✅ **Agilidad mental** - Mejora tu velocidad de procesamiento cognitivo  
✅ **Prevención cognitiva** - Ayuda a mantener el cerebro activo  
✅ **Reduce el estrés** - Actividades mentales relajantes y constructivas

### Para el Desarrollo Personal

🚀 **Seguimiento de progreso** - Visualiza tu mejora con estadísticas  
🏆 **Sistema de logros** - Motivación constante para seguir mejorando  
📈 **Competencia personal** - Supera tus propios récords  
🎯 **Objetivos claros** - Metas definidas en cada nivel

---

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React 19.1.1** - Biblioteca de JavaScript para construir interfaces de usuario
- **React Router DOM 7.9.5** - Navegación y enrutamiento en la aplicación
- **Vite 7.1.7** - Build tool y dev server ultrarrápido
- **CSS3** - Estilos modernos con gradientes, animaciones y transiciones

### Backend

- **Node.js 20.x** - Entorno de ejecución de JavaScript
- **Express 5.1.0** - Framework web minimalista para Node.js
- **MySQL 8.0** - Sistema de gestión de bases de datos relacional
- **CORS 2.8.5** - Middleware para habilitar CORS

### Herramientas de Desarrollo

- **Nodemon 3.1.10** - Reinicio automático del servidor en desarrollo
- **Concurrently 9.2.1** - Ejecutar múltiples comandos simultáneamente
- **ESLint 9.36.0** - Linter para mantener código limpio

---

## 🏗️ Arquitectura del Sistema

### Arquitectura General

```
┌─────────────────────────────────────────────────────┐
│                   CLIENTE (React)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │   Páginas    │  │ Componentes  │  │  Utilidades│ │
│  │  - Login     │  │  - Tutorial  │  │  - Sonidos │ │
│  │  - Home      │  │  - Loading   │  │  - Themes  │ │
│  │  - Juegos    │  │  - Modals    │  │            │ │
│  │  - Dashboard │  │  - Confetti  │  │            │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────┘
                          ↕ HTTP/JSON
┌─────────────────────────────────────────────────────┐
│              SERVIDOR (Express/Node.js)              │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │   Rutas API  │  │ Controladores│  │Middlewares│ │
│  │ /register    │  │  - Auth      │  │  - CORS   │ │
│  │ /login       │  │  - Partidas  │  │  - JSON   │ │
│  │ /partidas    │  │  - Stats     │  │           │ │
│  │ /estadisticas│  │              │  │           │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────┘
                          ↕ SQL
┌─────────────────────────────────────────────────────┐
│                BASE DE DATOS (MySQL)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │   usuarios   │  │   partidas   │  │estadísticas│
│  │  - id (PK)   │  │  - id (PK)   │  │ - id (PK) │ │
│  │  - nombre    │  │  - usuario_id│  │ - usuario_id│
│  │  - email     │  │  - juego_tipo│  │ - juegos_j│ │
│  │  - password  │  │  - nivel     │  │ - mejor_p │ │
│  │  - fecha     │  │  - puntaje   │  │           │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────┘
```

### Patrón de Arquitectura: **MVC (Modelo-Vista-Controlador)**

- **Modelo**: Base de datos MySQL con tablas relacionadas
- **Vista**: Componentes React con diseño responsivo
- **Controlador**: API REST en Express que gestiona la lógica de negocio

### Flujo de Datos

1. **Cliente → Servidor**: Peticiones HTTP (GET, POST)
2. **Servidor → Base de Datos**: Consultas SQL
3. **Base de Datos → Servidor**: Respuestas con datos
4. **Servidor → Cliente**: JSON con información procesada

---

## 🗄️ Modelo de Datos

### Diagrama Entidad-Relación (DER)

```
┌─────────────────┐
│    USUARIOS     │
├─────────────────┤
│ PK id           │───┐
│    nombre       │   │
│    email        │   │
│    password     │   │
│    fecha_reg    │   │
└─────────────────┘   │
                      │ 1
                      │
                      │ N
            ┌─────────┴──────────┐
            │                    │
    ┌───────▼──────┐    ┌───────▼──────────┐
    │  PARTIDAS    │    │  ESTADISTICAS    │
    ├──────────────┤    ├──────────────────┤
    │ PK id        │    │ PK id            │
    │ FK usuario_id│    │ FK usuario_id    │
    │    juego_tipo│    │    juegos_jugados│
    │    nivel     │    │    mejor_puntaje │
    │    puntaje   │    │    nivel_actual  │
    │    tiempo_seg│    │                  │
    │    fecha     │    │                  │
    └──────────────┘    └──────────────────┘
```

### Esquema de Tablas SQL

```sql
-- Tabla: usuarios
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: partidas
CREATE TABLE partidas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  juego_tipo VARCHAR(50) NOT NULL,
  nivel VARCHAR(20) NOT NULL,
  puntaje INT NOT NULL,
  tiempo_segundos INT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla: estadisticas
CREATE TABLE estadisticas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT UNIQUE NOT NULL,
  juegos_jugados INT DEFAULT 0,
  mejor_puntaje INT DEFAULT 0,
  nivel_actual VARCHAR(20) DEFAULT 'facil',
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
```

### Relaciones

- **1:N** - Un usuario puede tener muchas partidas
- **1:1** - Un usuario tiene una única tabla de estadísticas
- **CASCADE** - Si se elimina un usuario, se eliminan sus partidas y estadísticas

---

## 📥 Instalación

### Prerrequisitos

Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (v20 o superior)
- [MySQL](https://www.mysql.com/) (v8.0 o superior)
- [Git](https://git-scm.com/)

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/memory-trainer.git
cd memory-trainer
```

### Paso 2: Instalar dependencias

```bash
npm install
```

### Paso 3: Configurar la base de datos

1. Inicia MySQL:
```bash
mysql -u root -p
```

2. Crea la base de datos y las tablas:
```sql
CREATE DATABASE memory_trainer;
USE memory_trainer;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE partidas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  juego_tipo VARCHAR(50) NOT NULL,
  nivel VARCHAR(20) NOT NULL,
  puntaje INT NOT NULL,
  tiempo_segundos INT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE estadisticas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT UNIQUE NOT NULL,
  juegos_jugados INT DEFAULT 0,
  mejor_puntaje INT DEFAULT 0,
  nivel_actual VARCHAR(20) DEFAULT 'facil',
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
```

### Paso 4: Configurar credenciales

Edita el archivo `backend/db.js` con tus credenciales de MySQL:

```javascript
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'TU_CONTRASEÑA', // Cambia esto
  database: 'memory_trainer'
});
```

### Paso 5: Iniciar la aplicación

```bash
npm run dev
```

Esto iniciará:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

---

## 🚀 Uso

### 1. Registro de Usuario

1. Accede a la aplicación
2. Haz clic en "Regístrate"
3. Completa el formulario con:
   - Nombre completo
   - Email válido
   - Contraseña (mínimo 6 caracteres)

### 2. Iniciar Sesión

1. Ingresa tu email y contraseña
2. Tu sesión se mantendrá activa incluso si cierras el navegador

### 3. Seleccionar un Juego

**Nivel Fácil - Memoria de Cartas 🎴**
- Encuentra pares de cartas idénticas
- 16 cartas (8 pares)
- Ideal para comenzar

**Nivel Intermedio - Secuencia de Números 🔢**
- Memoriza y repite secuencias
- La dificultad aumenta con cada nivel
- Desafía tu memoria a corto plazo

**Nivel Difícil - Memoria Espacial 🧩**
- Recuerda posiciones exactas
- Grid de 5x5 (25 posiciones)
- Máximo 3 errores permitidos

### 4. Ver Estadísticas

1. Haz clic en "Ver Dashboard"
2. Revisa tu progreso:
   - Total de partidas jugadas
   - Mejor puntaje alcanzado
   - Historial detallado
   - Logros desbloqueados

---

## 📁 Estructura del Proyecto

```
memory-trainer/
│
├── backend/                    # Servidor Node.js
│   ├── db.js                   # Configuración de MySQL
│   └── server.js               # API REST con Express
│
├── src/                        # Código fuente del frontend
│   ├── components/             # Componentes reutilizables
│   │   ├── ConfettiEffect.jsx  # Efecto de confeti
│   │   ├── ConfirmModal.jsx    # Modal de confirmación
│   │   ├── LoadingScreen.jsx   # Pantalla de carga
│   │   ├── SoundToggle.jsx     # Control de sonido
│   │   ├── ThemeToggle.jsx     # Modo oscuro/claro
│   │   └── TutorialModal.jsx   # Tutorial interactivo
│   │
│   ├── pages/                  # Páginas principales
│   │   ├── Dashboard.jsx       # Dashboard de estadísticas
│   │   ├── Home.jsx            # Página principal
│   │   ├── Login.jsx           # Inicio de sesión
│   │   ├── MemoryGame.jsx      # Juego de memoria de cartas
│   │   ├── Registro.jsx        # Registro de usuarios
│   │   ├── SequenceGame.jsx    # Juego de secuencias
│   │   └── SpatialMemoryGame.jsx # Juego de memoria espacial
│   │
│   ├── styles/                 # Estilos CSS
│   │   └── Auth.css            # Estilos de autenticación
│   │
│   ├── utils/                  # Utilidades
│   │   └── soundManager.js     # Gestor de sonidos
│   │
│   ├── App.jsx                 # Componente principal
│   ├── App.css                 # Estilos globales
│   ├── index.css               # Estilos base
│   └── main.jsx                # Punto de entrada
│
├── public/                     # Archivos públicos
├── index.html                  # HTML principal
├── package.json                # Dependencias y scripts
├── vite.config.js              # Configuración de Vite
└── README.md                   # Este archivo
```

---

## 🎮 Juegos Disponibles

### 1. 🎴 Memoria de Cartas (Fácil)

**Objetivo**: Encontrar todos los pares de cartas idénticas

**Mecánica**:
- Haz clic en dos cartas para voltearlas
- Si coinciden, permanecen descubiertas
- Si no coinciden, se voltean de nuevo
- Completa el tablero en el menor número de movimientos

**Puntuación**:
- Base: 1000 puntos
- Penalización: -10 puntos por movimiento
- Penalización: -1 punto por segundo

### 2. 🔢 Secuencia de Números (Intermedio)

**Objetivo**: Memorizar y repetir secuencias cada vez más largas

**Mecánica**:
- Observa la secuencia de números que aparece
- Repite la secuencia haciendo clic en los números
- Cada nivel agrega un número más a la secuencia
- Un error termina el juego

**Puntuación**:
- 100 puntos por nivel completado
- Bonificación: Nivel × 100

### 3. 🧩 Memoria Espacial (Difícil)

**Objetivo**: Recordar la posición exacta de múltiples objetos

**Mecánica**:
- Aparecen objetos en diferentes posiciones del grid
- Tienes pocos segundos para memorizarlos
- Selecciona todas las posiciones correctas
- Máximo 3 errores permitidos
- Necesitas 80% de precisión para avanzar

**Puntuación**:
- 150 puntos por nivel completado
- Bonificación: Nivel × 150

---

## 📸 Capturas de Pantalla

### Pantalla de Login
Diseño moderno con gradientes y animaciones suaves.

### Home / Menú Principal
Selección de juegos con descripciones detalladas y modo oscuro.

### Juego de Memoria de Cartas
Interfaz limpia con estadísticas en tiempo real.

### Dashboard de Estadísticas
Gráficos detallados de tu progreso y logros.

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si deseas contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👥 Autores

**Joaquín Cuello** - *Desarrollo Full Stack* - [GitHub](https://github.com/joaquincuello-prog)

---

## 🙏 Agradecimientos

- Comunidad de React por las excelentes herramientas
- Diseño inspirado en aplicaciones modernas de productividad
- Investigación sobre beneficios cognitivos del entrenamiento de memoria

---

## 📞 Contacto

¿Preguntas o sugerencias? 

- Email: tu-email@ejemplo.com
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)
- Portfolio: [tu-portfolio.com](https://tu-portfolio.com)

---

## 🔮 Futuras Mejoras

- [ ] Sistema de ranking global entre usuarios
- [ ] Más juegos y niveles de dificultad
- [ ] Modo multijugador en tiempo real
- [ ] App móvil nativa (React Native)
- [ ] Integración con redes sociales
- [ ] Sistema de logros más complejo
- [ ] Análisis de progreso con IA
- [ ] Exportar estadísticas en PDF

---

<div align="center">

**Desarrollado con ❤️ y ☕**

⭐ Si te gustó este proyecto, ¡dale una estrella en GitHub! ⭐

</div>
