const express = require('express');
const cors = require('cors');

const perfilesRoutes = require('./routes/perfiles.routes');
const vacanteRoutes = require('./routes/vacante.routes');
const postulacionRoutes = require('./routes/postulacion.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const notificacionRoutes = require('./routes/notificacion.routes');
const perfilesController = require('./controllers/perfiles.controller');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/registro-estudiante', perfilesController.registrarEstudiante);
app.post('/api/registro/estudiante', perfilesController.registrarEstudiante);
app.post('/registro-estudiante', perfilesController.registrarEstudiante);
app.post('/registro/estudiante', perfilesController.registrarEstudiante);

app.post('/api/registro-empresa', perfilesController.registrarEmpresa);
app.post('/api/registro/empresa', perfilesController.registrarEmpresa);
app.post('/registro-empresa', perfilesController.registrarEmpresa);
app.post('/registro/empresa', perfilesController.registrarEmpresa);

app.use('/api/perfiles', perfilesRoutes);
app.use('/api/vacantes', vacanteRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/notificaciones', notificacionRoutes);
app.use('/api', postulacionRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Servidor centralizado de UCAB Connect corriendo exitosamente."
    });
});

app.use((req, res) => {
    res.status(404).json({ 
        error: true, 
        message: "La ruta solicitada no existe en este servidor." 
    });
});

module.exports = app;