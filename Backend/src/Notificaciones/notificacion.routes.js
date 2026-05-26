const express = require('express');
const router = express.Router();
const notificacionController = require('./notificacion.controller');

// ==========================================
// RUTAS - ÉPICA: GESTIONAR NOTIFICACIONES
// ==========================================

router.get('/', notificacionController.getNotificaciones);
router.post('/', notificacionController.crearNotificacion);
router.delete('/:id', notificacionController.eliminarNotificacion);
router.delete('/', notificacionController.limpiarBandeja);

module.exports = router;