const express = require('express');
const router = express.Router();
const vacanteController = require('../controllers/vacanteController');

// Ruta para listar vacantes (Petición GET a http://localhost:3000/api/vacantes)
router.get('/', vacanteController.obtenerVacantes);

// Ruta para añadir una vacante (Petición POST a http://localhost:3000/api/vacantes)
router.post('/', vacanteController.crearVacante);

// Ruta para cambiar el estado a Cerrada (Petición PUT a http://localhost:3000/api/vacantes/:id/cerrar)
router.put('/:id/cerrar', vacanteController.cerrarVacante);

module.exports = router;