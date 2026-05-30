const fs = require('fs');
const { DB_FILE } = require('../config/db.config');

const leerBaseDeDatos = () => {
    try {
        if (!fs.existsSync(DB_FILE)) {
            return { usuarios: [] };
        }
        const data = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return { usuarios: [] };
    }
};

const login = (req, res) => {
    const { email, contrasena } = req.body;
    const db = leerBaseDeDatos();
    
    const usuario = db.usuarios.find(u => u.correoElectronico === email && u.contrasena === contrasena);

    if (usuario) {
        res.json({
            mensaje: `Login ${usuario.rol.toLowerCase()} exitoso`,
            rol: usuario.rol.toLowerCase(),
            usuario: usuario
        });
    } else {
        res.status(401).json({
            mensaje: 'Credenciales incorrectas o usuario no encontrado'
        });
    }
};

module.exports = {
    login
};