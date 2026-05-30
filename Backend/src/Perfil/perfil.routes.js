const express = require('express');
const router = express.Router();
const perfilController = require('./perfil.controller');

// Cuando el frontend haga un GET a /api/perfil, el controlador se encarga
router.get('/', perfilController.obtenerPerfil);

module.exports = router;