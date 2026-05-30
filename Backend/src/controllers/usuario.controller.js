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
   REGISTRAR USUARIO
========================= */
const actualizarUsuario = (req, res) => {
    const nuevoUsuario = req.body;
    const usuarios = leerUsuarios();

    // Verificamos si es empresa (las empresas suelen tener 'rif' o 'sector')
    if (nuevoUsuario.rif || nuevoUsuario.sector) {
        const existe = usuarios.empresas.find(e => e.correo === nuevoUsuario.correo);
        if (existe) return res.status(400).json({ mensaje: 'El correo de la empresa ya está registrado' });
        
        usuarios.empresas.push(nuevoUsuario);
    } else {
        // Es un estudiante
        const existe = usuarios.estudiantes.find(e => e.correoInstitucional === nuevoUsuario.correoInstitucional);
        if (existe) return res.status(400).json({ mensaje: 'El correo institucional ya está registrado' });
        
        usuarios.estudiantes.push(nuevoUsuario);
    }

    // Escribimos los cambios en el archivo JSON
    guardarUsuarios(usuarios);
    
    console.log(`Nuevo usuario registrado exitosamente.`);
    res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
};

/* =========================
   LOGIN
========================= */
const login = (req, res) => {
    const { email, contrasena } = req.body;
    const usuarios = leerUsuarios();

    // Buscar en la lista de estudiantes
    const estudiante = usuarios.estudiantes.find(e => e.correoInstitucional === email && e.contrasena === contrasena);
    if (estudiante) {
        return res.json({
            mensaje: 'Login estudiante exitoso',
            rol: 'estudiante',
            usuario: estudiante
        });
    }

    // Buscar en la lista de empresas
    const empresa = usuarios.empresas.find(e => e.correo === email && e.contrasena === contrasena);
    if (empresa) {
        return res.json({
            mensaje: 'Login empresa exitoso',
            rol: 'empresa',
            usuario: empresa
        });
    }

    // Si no lo encuentra en ningún lado
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