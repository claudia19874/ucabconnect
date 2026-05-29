const express = require('express');
const cors = require('cors');

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
// Aquí guardaremos las vacantes y notificaciones en memoria
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
   LOGIN
========================= */

app.post('/api/usuario/login', (req, res) => {
  const { email, contrasena } = req.body;

  // LOGIN ESTUDIANTE
  if (
    email === usuarioEstudiante.correoInstitucional &&
    contrasena === usuarioEstudiante.contrasena
  ) {
    return res.json({
      mensaje: 'Login estudiante exitoso',
      rol: 'estudiante',
      usuario: usuarioEstudiante
    });
  }

  // LOGIN EMPRESA
  if (
    email === usuarioEmpresa.correo &&
    contrasena === usuarioEmpresa.contrasena
  ) {
    return res.json({
      mensaje: 'Login empresa exitoso',
      rol: 'empresa',
      usuario: usuarioEmpresa
    });
  }

  res.status(401).json({
    mensaje: 'Credenciales incorrectas'
  });
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
// 1. Ruta para RECIBIR y guardar una nueva vacante
app.post('/api/vacantes', (req, res) => {
  const nuevaVacante = req.body;
  
  // Le asignamos un ID único basado en la hora actual
  nuevaVacante.id = Date.now().toString(); 
  
  // La guardamos en nuestro arreglo
  vacantesPublicadas.push(nuevaVacante);

  console.log("Nueva vacante recibida y guardada:", nuevaVacante.titulo);

  res.status(201).json({
    mensaje: 'Vacante publicada con éxito',
    vacante: nuevaVacante
  });
});

// 2. Ruta para ENVIAR todas las vacantes cuando el frontend las pida
app.get('/api/vacantes', (req, res) => {
  res.json(vacantesPublicadas);
});

// 3. Ruta para CERRAR una vacante existente (HU 3)
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
// Para que tu pestaña de notificaciones funcione sin errores
app.post('/api/notificaciones', (req, res) => {
  const nuevaNotificacion = req.body;
  nuevaNotificacion.id = Date.now().toString();
  
  // NUEVO: Le inyectamos la fecha y hora exacta del servidor en formato local
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
   SERVIDOR 
========================= */

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});