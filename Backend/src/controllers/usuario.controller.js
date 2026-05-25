/* =========================
   USUARIO TEMPORAL
========================= */

const usuario = {
  nombre: 'Juan Pérez',
  email: 'juan.perez@ucab.edu.ve',
  cedula: 'V-12345678',
  carrera: 'Ingeniería Informática',
  semestre: '8° Semestre',
  sede: 'Montalbán (Caracas)',
  telefono: '+58 412-1234567',
  habilidades: [
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'SQL',
    'Git'
  ]
};

/* =========================
   OBTENER USUARIO
========================= */

const obtenerUsuario = (req, res) => {

  res.json(usuario);

};

/* =========================
   ACTUALIZAR USUARIO
========================= */

const actualizarUsuario = (req, res) => {

  const nuevosDatos = req.body;

  Object.assign(usuario, nuevosDatos);

  res.json({
    mensaje: 'Usuario actualizado',
    usuario
  });

};

module.exports = {
  obtenerUsuario,
  actualizarUsuario
};