const express = require('express');
const router = express.Router();
const perfilesController = require('../controllers/perfiles.controller');

//
router.post('/registro/estudiante', perfilesController.registrarEstudiante);
router.post('/registro/empresa', perfilesController.registrarEmpresa);

module.exports = router;