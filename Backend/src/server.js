const express = require('express');
const cors = require('cors');
const notificacionController = require('./controllers/notificacion.controller');

const app = express();
const PORT = 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// ==========================================
// ENLACE DE RUTAS A LOS CONTROLADORES
// ==========================================

app.get('/api/notificaciones', notificacionController.getNotificaciones);
app.post('/api/notificaciones', notificacionController.crearNotificacion);
app.delete('/api/notificaciones/:id', notificacionController.eliminarNotificacion);
app.delete('/api/notificaciones', notificacionController.limpiarBandeja);

// ==========================================
// ARRANQUE DEL SERVIDOR
// ==========================================
app.listen(PORT, () => {
    console.log(`✅ Servidor estructurado corriendo en http://localhost:${PORT}`);
});