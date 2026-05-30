const fs = require('fs');
const { DB_FILE } = require('../config/db.config');

const CODIGO_VERIFICACION_UCAB = "202610123456";

const leerBaseDeDatos = () => {
    try {
        if (!fs.existsSync(DB_FILE)) {
            return { usuarios: [], notificaciones: [] };
        }
        const data = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return { usuarios: [], notificaciones: [] };
    }
};

const guardarBaseDeDatos = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
};

class PerfilesController {

    async registrarEstudiante(req, res) {
        try {
            const { 
                sedeUcab, nombre, apellido, cedula, telefono, 
                correoInstitucional, correoElectronico, carrera, 
                semestreActual, contrasena, habilidades, preferencias 
            } = req.body;

            const email = correoInstitucional || correoElectronico;

            if (!email || !contrasena) {
                return res.status(400).json({ 
                    error: true, 
                    message: "Faltan campos obligatorios (correo y contraseña)." 
                });
            }

            const db = leerBaseDeDatos();
            const usuarioExistente = db.usuarios.find(u => u.correoElectronico === email || (cedula && u.cedula === cedula));
            
            if (usuarioExistente) {
                return res.status(400).json({ 
                    error: true, 
                    message: "El usuario ya se encuentra registrado." 
                });
            }

            const nuevoEstudiante = {
                id: Date.now().toString(),
                sedeUcab: sedeUcab || "Montalbán",
                nombre: nombre || "Estudiante",
                apellido: apellido || "UCAB",
                cedula: cedula || "",
                telefono: telefono || "",
                correoElectronico: email,
                contrasena,
                carrera: carrera || "Ingeniería Informática",
                semestreActual: semestreActual || "",
                habilidades: habilidades || "",
                preferencias: preferencias || "",
                rol: "ESTUDIANTE",
                fechaRegistro: new Date().toISOString()
            };

            db.usuarios.push(nuevoEstudiante);
            guardarBaseDeDatos(db);

            return res.status(201).json({
                success: true,
                message: "¡Perfil de estudiante creado con éxito!",
                data: nuevoEstudiante
            });

        } catch (error) {
            return res.status(500).json({ error: true, message: "Error interno en el registro de estudiante." });
        }
    }

    async registrarEmpresa(req, res) {
        try {
            const { nombreEmpresa, rif, sector, correoElectronico, telefono, direccion, ciudad, nombreContacto, cargoContacto, contrasena, codigoVerificacion } = req.body;

            if (!nombreEmpresa || !rif || !correoElectronico || !contrasena) {
                return res.status(400).json({ 
                    error: true, 
                    message: "Faltan campos obligatorios en el formulario de empresa." 
                });
            }

            const db = leerBaseDeDatos();
            const empresaExistente = db.usuarios.find(u => u.rif === rif || u.correoElectronico === correoElectronico);
            
            if (empresaExistente) {
                return res.status(400).json({ 
                    error: true, 
                    message: "La empresa ya está registrada." 
                });
            }

            const nuevaEmpresa = {
                id: Date.now().toString(),
                nombreEmpresa,
                rif,
                sector: sector || "",
                correoElectronico,
                contrasena,
                telefono: telefono || "",
                direccion: direccion || "",
                ciudad: ciudad || "",
                contacto: { nombre: nombreContacto || "", cargo: cargoContacto || "" },
                rol: "EMPRESA",
                verificada: true,
                fechaRegistro: new Date().toISOString()
            };

            db.usuarios.push(nuevaEmpresa);
            guardarBaseDeDatos(db);

            return res.status(201).json({
                success: true,
                message: "¡Perfil de empresa creado con éxito!",
                data: nuevaEmpresa
            });

        } catch (error) {
            return res.status(500).json({ error: true, message: "Error interno al registrar la empresa." });
        }
    }

    async obtenerPerfil(req, res) {
        try {
            const { cedula } = req.params;
            const db = leerBaseDeDatos();
            const usuario = db.usuarios.find(u => u.cedula === cedula);
            
            if (!usuario) {
                return res.status(404).json({ error: true, message: "Estudiante no encontrado." });
            }
            
            return res.status(200).json({ success: true, data: usuario });
        } catch (error) {
            return res.status(500).json({ error: true, message: "Error al obtener el perfil." });
        }
    }
}

module.exports = new PerfilesController();