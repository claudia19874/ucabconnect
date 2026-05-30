const express = require('express');
const router = express.Router();
const perfilesController = require('../controllers/perfiles.controller');

router.post('/registro/estudiante', perfilesController.registrarEstudiante);
router.post('/registro-estudiante', perfilesController.registrarEstudiante);
router.post('/estudiante', perfilesController.registrarEstudiante);

router.post('/registro/empresa', perfilesController.registrarEmpresa);
router.post('/registro-empresa', perfilesController.registrarEmpresa);
router.post('/empresa', perfilesController.registrarEmpresa);

router.get('/perfil/:cedula', perfilesController.obtenerPerfil);

module.exports = router;