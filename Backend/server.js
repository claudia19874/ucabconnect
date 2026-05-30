const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ==========================================
// RUTAS POR ÉPICA
// ==========================================
const authRoutes          = require('./src/Auth/auth.routes');
const notificacionRoutes  = require('./src/Notificaciones/notificacion.routes');
const perfilRoutes        = require('./src/Perfil/perfil.routes');
const vacantesRoutes      = require('./src/Vacantes/vacantes.routes');
const postulacionRoutes   = require('./src/Postulaciones/postulacion.routes');

app.use('/api/auth',           authRoutes);
app.use('/api/notificaciones', notificacionRoutes);
app.use('/api/perfil',         perfilRoutes);
app.use('/api/vacantes',       vacantesRoutes);
app.use('/api/postulaciones',  postulacionRoutes);

// Ruta legacy de pasantías (usada por el estudiante para explorar)
app.get('/api/pasantias', (req, res) => {
    const dbPath = path.join(__dirname, 'database.json');
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error leyendo BD' });
        try {
            const db = JSON.parse(data);
            res.json(db.pasantias || []);
        } catch (e) {
            res.status(500).json({ error: 'Error de formato' });
        }
    });
});

app.post('/api/postulaciones', (req, res) => {
    const dbPath = path.join(__dirname, 'database.json');
    const nuevaPostulacion = req.body;
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al leer' });
        try {
            const db = JSON.parse(data);
            if (!db.postulaciones) db.postulaciones = [];
            db.postulaciones.push(nuevaPostulacion);
            if (db.pasantias) {
                const pasantia = db.pasantias.find(p => p.id === nuevaPostulacion.pasantiaId);
                if (pasantia) pasantia.aplicado = true;
            }
            fs.writeFile(dbPath, JSON.stringify(db, null, 2), (writeErr) => {
                if (writeErr) return res.status(500).json({ error: 'Error al guardar' });
                res.status(201).json({ mensaje: '¡Postulación guardada!', db });
            });
        } catch (e) {
            res.status(500).json({ error: 'Error de procesamiento' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});