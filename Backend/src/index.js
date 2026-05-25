const express = require('express');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuario.routes');

const app = express();

/* =========================
   MIDDLEWARES
========================= */

app.use(cors());

app.use(express.json());

/* =========================
   RUTAS
========================= */

app.use('/usuario', usuarioRoutes);

/* =========================
   RUTA TEST
========================= */

app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

/* =========================
   SERVIDOR
========================= */

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});