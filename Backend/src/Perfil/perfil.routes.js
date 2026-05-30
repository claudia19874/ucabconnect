const express = require('express');
const router = express.Router();
const perfilController = require('./perfil.controller');

router.get('/', perfilController.obtenerPerfil);

module.exports = router;