const express = require('express');

const router = express.Router();

const {
  obtenerUsuario,
  actualizarUsuario,
  login
} = require('../controllers/usuario.controller');

/* =========================
   RUTAS USUARIO
========================= */

// Obtener usuario
router.get('/', obtenerUsuario);

// Actualizar usuario
router.put('/', actualizarUsuario);

// Registrar usuario temporal
router.post('/', actualizarUsuario);

// Login
router.post('/login', login);

module.exports = router;