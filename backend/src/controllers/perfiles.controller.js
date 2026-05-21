const usuariosDB = [];
const CODIGO_VERIFICACION_UCAB = "202610123456";

class PerfilesController {
    

    //Registrar Estudiante

    async registrarEstudiante(req, res) {
        try {
            const { sedeUcab, nombre, apellido, cedula, telefono, correoInstitucional, carrera, semestreActual, contrasena } = req.body;

            if (!sedeUcab || !nombre || !apellido || !cedula || !correoInstitucional || !contrasena) {
                return res.status(400).json({ 
                    error: true, 
                    message: "Faltan campos obligatorios en el formulario de estudiante." 
                });
            }

            if (!correoInstitucional.endsWith('@est.ucab.edu.ve')) {
                return res.status(400).json({ 
                    error: true, 
                    message: "El correo electrónico debe pertenecer al dominio de estudiantes (@est.ucab.edu.ve)." 
                });
            }

            const usuarioExistente = usuariosDB.find(u => u.cedula === cedula || u.correoElectronico === correoInstitucional);
            if (usuarioExistente) {
                return res.status(400).json({ 
                    error: true, 
                    message: "La cédula o el correo ya se encuentran registrados." 
                });
            }

            const nuevoEstudiante = {
                id: usuariosDB.length + 1,
                sedeUcab,
                nombre,
                apellido,
                cedula,
                telefono: telefono || "No especificado",
                correoElectronico: correoInstitucional,
                carrera: carrera || "Ingeniería Informática",
                semestreActual: parseInt(semestreActual) || 1,
                rol: "ESTUDIANTE",
                fechaRegistro: new Date()
            };

            usuariosDB.push(nuevoEstudiante);
            console.log("Estudiante registrado con éxito:", nuevoEstudiante.correoElectronico);

            return res.status(201).json({
                success: true,
                message: "¡Perfil de estudiante creado con éxito!",
                data: nuevoEstudiante
            });

        } catch (error) {
            return res.status(500).json({ error: true, message: "Error interno en el registro de estudiante." });
        }
    }

    // Registrar Empresa
    async registrarEmpresa(req, res) {
        try {
            const { nombreEmpresa, rif, sector, correoElectronico, telefono, direccion, ciudad, nombreContacto, cargoContacto, contrasena, codigoVerificacion } = req.body;

            if (!nombreEmpresa || !rif || !correoElectronico || !contrasena || !codigoVerificacion) {
                return res.status(400).json({ 
                    error: true, 
                    message: "Faltan campos obligatorios en el formulario de empresa." 
                });
            }

            if (codigoVerificacion !== CODIGO_VERIFICACION_UCAB) {
                return res.status(403).json({ 
                    error: true, 
                    message: "Código de verificación institucional inválido. Solicite el autorizado a la UCAB." 
                });
            }

            const empresaExistente = usuariosDB.find(u => u.rif === rif || u.correoElectronico === correoElectronico);
            if (empresaExistente) {
                return res.status(400).json({ 
                    error: true, 
                    message: "El RIF o el correo de la empresa ya están registrados." 
                });
            }

            const nuevaEmpresa = {
                id: usuariosDB.length + 1,
                nombreEmpresa,
                rif,
                sector: sector || "No especificado",
                correoElectronico,
                telefono,
                direccion,
                ciudad,
                contacto: { nombre: nombreContacto, cargo: cargoContacto },
                rol: "EMPRESA",
                verificada: true,
                fechaRegistro: new Date()
            };

            usuariosDB.push(nuevaEmpresa);
            console.log(" Empresa registrada con éxito:", nuevaEmpresa.nombreEmpresa);

            return res.status(201).json({
                success: true,
                message: "¡Perfil de empresa creado con éxito!",
                data: nuevaEmpresa
            });

        } catch (error) {
            return res.status(500).json({ error: true, message: "Error interno al registrar la empresa." });
        }
    }
}

module.exports = new PerfilesController();