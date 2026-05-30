const express = require('express');
const router = express.Router();
const notificacionController = require('../controllers/notificacion.controller');

router.get('/', notificacionController.obtenerNotificaciones);
router.post('/', notificacionController.crearNotificacion);

module.exports = router;