const express = require('express');
const router = express.Router();
const vacantesController = require('./vacantes.controller');

router.get('/:id', vacantesController.obtenerVacantesPorEmpresa);
router.post('/', vacantesController.crearVacante);
router.put('/:id', vacantesController.cerrarVacante);

module.exports = router;