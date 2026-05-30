const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');

router.post('/login',              authController.login);
router.post('/registro/estudiante', authController.registrarEstudiante);
router.post('/registro/empresa',    authController.registrarEmpresa);

module.exports = router;