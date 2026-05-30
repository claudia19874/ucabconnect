const express = require('express');
const router = express.Router();
const postulacionController = require('../controllers/postulacion.controller');

router.get('/postulaciones', postulacionController.obtenerTodas);
router.post('/postulaciones', postulacionController.crear);

module.exports = router;