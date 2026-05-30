const express = require('express');
const router = express.Router();
const vacanteController = require('../controllers/vacante.controller');

router.get('/', vacanteController.obtenerVacantes);
router.post('/', vacanteController.crearVacante);
router.put('/:id/cerrar', vacanteController.cerrarVacante);

module.exports = router;