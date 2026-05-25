const express = require('express');

const router = express.Router();

const {
  obtenerUsuario,
  actualizarUsuario
} = require('../controllers/usuario.controller');

/* =========================
   RUTAS USUARIO
========================= */

router.get('/', obtenerUsuario);

router.put('/', actualizarUsuario);

module.exports = router;