const express = require('express');
const PostulacionController = require('../controllers/PostulacionController');

class PostulacionRoutes {
    constructor() {
        this.router = express.Router();
        this.configurarRutas();
    }

    configurarRutas() {
        // Endpoint para la Historia de Usuario: Postularse
        this.router.post('/postulaciones', (req, res) => PostulacionController.crearPostulacion(req, res));
        
        // Endpoint para la Historia de Usuario: Ver postulaciones y verificar Estados
        this.router.get('/postulaciones/estudiante/:idEstudiante', (req, res) => PostulacionController.obtenerPorEstudiante(req, res));
    }

    getRouter() {
        return this.router;
    }
}


module.exports = new PostulacionRoutes().getRouter();