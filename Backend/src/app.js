const express = require('express');
const cors = require('cors');
require('dotenv').config(); // 1. Rescatamos esto de tu compañera por si usan variables de entorno

// Importación de rutas
const perfilesRoutes = require('./routes/perfiles.routes');
const postulacionRoutes = require('./routes/PostulacionRoutes'); // 2. Traemos las rutas de postulaciones

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Rutas de la API
app.use('/api/perfiles', perfilesRoutes);
app.use('/api', postulacionRoutes); // 3. Conectamos las rutas de tu compañera

// Ruta de comprobación base
app.get('/', (req, res) => {
    res.send('Servidor de UCAB Connect corriendo exitosamente.');
});

// Exportamos la app tal como lo tenías tú
module.exports = app;