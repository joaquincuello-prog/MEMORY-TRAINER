import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',             // tu usuario MySQL
  password: 'vueltassol', // reemplazá con tu contraseña
  database: 'memory_trainer'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar con MySQL:', err);
  } else {
    console.log('✅ Conexión exitosa a la base de datos MySQL');
  }
});

export default connection;
