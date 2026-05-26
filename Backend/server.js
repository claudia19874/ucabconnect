const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// MIDDLEWARES GLOBALES
// ==========================================
app.use(cors());
app.use(express.json());

// ==========================================
// RUTAS POR ÉPICA
// ==========================================
const notificacionRoutes = require('./src/Notificaciones/notificacion.routes');
// const vacanteRoutes      = require('./src/Vacantes/vacante.routes');       // Sprint 2
// const postulacionRoutes  = require('./src/Postulaciones/postulacion.routes'); // Sprint 2
// const perfilRoutes       = require('./src/Perfil/perfil.routes');           // Sprint 2

app.use('/api/notificaciones', notificacionRoutes);
// app.use('/api/vacantes',       vacanteRoutes);
// app.use('/api/postulaciones',  postulacionRoutes);
// app.use('/api/perfil',         perfilRoutes);

// ==========================================
// ARRANQUE DEL SERVIDOR
// ==========================================
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});