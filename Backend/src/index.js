const express = require('express');
const cors = require('cors');

/* =========================
   IMPORTAR RUTAS
========================= */

const postulacionRoutes = require('./routes/PostulacionRoutes');
const usuarioRoutes = require('./routes/usuario.routes');
const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   USUARIO ESTUDIANTE
========================= */

const usuarioEstudiante = {
  nombre: "Sebastian",
  apellido: "Figueira",
  correoInstitucional: "sfigueira.24@est.ucab.edu.ve",
  cedula: "V-30514220",
  carrera: "Ingeniería Informatica",
  semestreActual: "4° Semestre",
  sedeUcab: "Montalbán (Caracas)",
  telefono: "+58 412-3095387",
  contrasena: "12345678",

  habilidades: [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "SQL",
    "Git"
  ],

  intereses: [
    "UX/UI",
    "Desarrollo Backend"
  ]
};

/* =========================
   USUARIO EMPRESA
========================= */

const usuarioEmpresa = {
  empresa: "Google",
  correo: "empresa@google.com",
  contrasena: "empresa123",
  rif: "J-12345678-9",
  sector: "Tecnología",
  telefono: "+58 212-5550000"
};

/* =========================
   BASES DE DATOS TEMPORALES
========================= */
let vacantesPublicadas = [];
let notificacionesPublicadas = [];

/* =========================
   RUTA PRINCIPAL
========================= */

app.get('/', (req, res) => {
  res.json({
    estudiante: usuarioEstudiante,
    empresa: usuarioEmpresa
  });
});

/* =========================
   OBTENER USUARIO ESTUDIANTE
========================= */

app.get('/api/usuario', (req, res) => {
  res.json(usuarioEstudiante);
});

/* =========================
   RECUPERAR CONTRASEÑA
========================= */

app.post('/api/recuperar-password', (req, res) => {
  const { correoInstitucional, contrasena } = req.body;

  if (
    correoInstitucional === usuarioEstudiante.correoInstitucional &&
    contrasena === usuarioEstudiante.contrasena
  ) {
    return res.json({
      mensaje: 'Correo de recuperación enviado'
    });
  }

  res.status(404).json({
    mensaje: 'Correo no encontrado'
  });
});

/* =========================
   GESTIÓN DE VACANTES
========================= */

app.post('/api/vacantes', (req, res) => {
  const nuevaVacante = req.body;
  nuevaVacante.id = Date.now().toString(); 
  vacantesPublicadas.push(nuevaVacante);
  console.log("Nueva vacante recibida y guardada:", nuevaVacante.titulo);
  res.status(201).json({
    mensaje: 'Vacante publicada con éxito',
    vacante: nuevaVacante
  });
});

app.get('/api/vacantes', (req, res) => {
  res.json(vacantesPublicadas);
});

app.put('/api/vacantes/:id/cerrar', (req, res) => {
  const { id } = req.params;
  const indice = vacantesPublicadas.findIndex(v => v.id === id);

  if (indice !== -1) {
    vacantesPublicadas[indice].estado = 'Cerrada';
    console.log(`Vacante ${id} clausurada.`);
    res.json({ mensaje: 'Vacante clausurada exitosamente' });
  } else {
    res.status(404).json({ mensaje: 'Vacante no encontrada' });
  }
});

/* =========================
   GESTIÓN DE NOTIFICACIONES
========================= */

app.post('/api/notificaciones', (req, res) => {
  const nuevaNotificacion = req.body;
  nuevaNotificacion.id = Date.now().toString();
  nuevaNotificacion.fecha = new Date().toLocaleString('es-VE');
  notificacionesPublicadas.push(nuevaNotificacion);
  res.status(201).json(nuevaNotificacion);
});

app.get('/api/notificaciones', (req, res) => {
  res.json(notificacionesPublicadas);
});

app.delete('/api/notificaciones/:id', (req, res) => {
  const { id } = req.params;
  notificacionesPublicadas = notificacionesPublicadas.filter(noti => noti.id !== id);
  res.json({ mensaje: 'Notificación eliminada' });
});

/* =========================
   INTEGRACIÓN DE RUTAS MODULARES
========================= */

app.use('/api', postulacionRoutes);
app.use('/api/usuario', usuarioRoutes);

/* =========================
   SERVIDOR 
========================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});