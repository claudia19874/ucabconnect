const fs = require('fs');
const path = require('path');

// Ruta absoluta a nuestro archivo JSON
const filePath = path.join(__dirname, '../data/usuarios.json');

// Función auxiliar: Leer la base de datos
const leerUsuarios = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error leyendo el JSON de usuarios. Se creará uno nuevo.");
        return { estudiantes: [], empresas: [] };
    }
};

// Función auxiliar: Guardar en la base de datos
const guardarUsuarios = (datos) => {
    fs.writeFileSync(filePath, JSON.stringify(datos, null, 2), 'utf-8');
};

/* =========================
   REGISTRAR USUARIO (BLINDADO)
========================= */
const actualizarUsuario = (req, res) => {
    const nuevoUsuario = req.body;
    const usuarios = leerUsuarios();

    // Mensaje para ver en la terminal qué envía tu frontend exactamente
    console.log("👉 Datos recibidos en el backend:", nuevoUsuario);

    // FILTRO: Detecta si es empresa por cualquiera de estos campos
    const esEmpresa = nuevoUsuario.rif || 
                      nuevoUsuario.sector || 
                      nuevoUsuario.empresa || 
                      nuevoUsuario.nombreEmpresa || 
                      (nuevoUsuario.correo && !nuevoUsuario.correo.endsWith('@est.ucab.edu.ve'));

    if (esEmpresa) {
        const correoAEvaluar = nuevoUsuario.correo || nuevoUsuario.correoInstitucional;
        const existe = usuarios.empresas.find(e => (e.correo === correoAEvaluar || e.correoInstitucional === correoAEvaluar));
        
        if (existe) return res.status(400).json({ mensaje: 'El correo de la empresa ya está registrado' });
        
        usuarios.empresas.push(nuevoUsuario);
        console.log("🏢 Empresa clasificada y guardada con éxito.");
    } else {
        // Es un estudiante
        const existe = usuarios.estudiantes.find(e => e.correoInstitucional === nuevoUsuario.correoInstitucional);
        
        if (existe) return res.status(400).json({ mensaje: 'El correo institucional ya está registrado' });
        
        usuarios.estudiantes.push(nuevoUsuario);
        console.log("🎓 Estudiante clasificado y guardado con éxito.");
    }

    // Guardar cambios en el JSON
    guardarUsuarios(usuarios);
    res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
};

/* =========================
   LOGIN
========================= */
const login = (req, res) => {
    const { email, contrasena } = req.body;
    const usuarios = leerUsuarios();

    const estudiante = usuarios.estudiantes.find(e => e.correoInstitucional === email && e.contrasena === contrasena);
    if (estudiante) {
        return res.json({ mensaje: 'Login estudiante exitoso', rol: 'estudiante', usuario: estudiante });
    }

    const empresa = usuarios.empresas.find(e => e.correo === email && e.contrasena === contrasena);
    if (empresa) {
        return res.json({ mensaje: 'Login empresa exitoso', rol: 'empresa', usuario: empresa });
    }

    res.status(401).json({ mensaje: 'Credenciales incorrectas' });
};

const obtenerUsuario = (req, res) => {
    const usuarios = leerUsuarios();
    res.json(usuarios);
};

module.exports = {
    obtenerUsuario,
    actualizarUsuario,
    login
};