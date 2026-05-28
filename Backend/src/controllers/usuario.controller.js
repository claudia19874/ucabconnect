/* =========================
   USUARIO TEMPORAL
========================= */

let usuario = {
  nombre: 'Sebastian Figueira',
  correoInstitucional: 'sfigueira.24@est.ucab.edu.ve',
  cedula: 'V-30514220',
  carrera: 'Ingeniería Informática',
  semestreActual: '4° Semestre',
  sedeUcab: 'Montalbán (Caracas)',
  telefono: '+58 412-1234567',
  habilidades: [
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'SQL',
    'Git'
  ],
  intereses: [
    'UX/UI',
    'Backend',
    'Base de Datos'
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

  // Reemplaza COMPLETAMENTE el usuario
  usuario = req.body;

  res.json({
    mensaje: 'Usuario actualizado',
    usuario
  });

};


/* =========================
   LOGIN
========================= */

const login = (req, res) => {

  const { email } = req.body;

  // Simulación login

  if (email === usuario.correoInstitucional){

    res.json({
      mensaje: 'Login exitoso',
      usuario
    });

  } else {

    res.status(401).json({
      mensaje: 'Usuario no encontrado'
    });

  }

};

module.exports = {
  obtenerUsuario,
  actualizarUsuario,
  login
};