const express = require('express');
const cors = require('cors');
const vacanteRoutes = require('./routes/vacanteRoutes');

const app = express();
const PORT = 3000; // Puedes cambiarlo si usas otro puerto

// Middlewares obligatorios
app.use(cors()); // Permite peticiones desde el frontend (Angular)
app.use(express.json()); // Permite al servidor entender datos en formato JSON

// Conexión de Rutas
app.use('/api/vacantes', vacanteRoutes);

// Arranque del servidor
app.listen(PORT, () => {
    console.log(`Servidor Backend de UCABConnect corriendo en http://localhost:${PORT}`);
});