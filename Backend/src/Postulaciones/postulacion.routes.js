const express = require('express');
const router = express.Router();
const postulacionController = require('./postulacion.controller');

// Ruta: GET /api/postulaciones
router.get('/', postulacionController.getPostulaciones);

module.exports = router;