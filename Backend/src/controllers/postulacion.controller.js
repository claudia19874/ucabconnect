const fs = require('fs');
const path = require('path');
const { DB_FILE } = require('../config/db.config');

const postulacionesFilePath = path.join(__dirname, '../data/postulacion.json');

const leerPostulaciones = () => {
    try {
        if (!fs.existsSync(postulacionesFilePath)) {
            const carpetaData = path.dirname(postulacionesFilePath);
            if (!fs.existsSync(carpetaData)) {
                fs.mkdirSync(carpetaData, { recursive: true });
            }
            fs.writeFileSync(postulacionesFilePath, JSON.stringify([]), 'utf-8');
            return [];
        }
        const data = fs.readFileSync(postulacionesFilePath, 'utf-8');
        return data.trim() ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
};

const guardarPostulaciones = (data) => {
    fs.writeFileSync(postulacionesFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

const leerUsuarios = () => {
    try {
        if (!fs.existsSync(DB_FILE)) return [];
        const data = fs.readFileSync(DB_FILE, 'utf-8');
        const json = JSON.parse(data);
        return json.usuarios || [];
    } catch (error) {
        return [];
    }
};

class PostulacionController {
    
    obtenerTodas(req, res) {
        try {
            const postulaciones = leerPostulaciones();
            res.status(200).json(postulaciones);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener las postulaciones." });
        }
    }

    crear(req, res) {
        try {
            const { estudianteId, vacanteId, comentarios } = req.body;

            if (!estudianteId || !vacanteId) {
                return res.status(400).json({ message: "Estudiante ID y Vacante ID son requeridos." });
            }

            const usuarios = leerUsuarios();
            const estudiante = usuarios.find(u => u.id === estudianteId && u.rol === "ESTUDIANTE");

            if (!estudiante) {
                return res.status(404).json({ message: "El estudiante especificado no existe." });
            }

            const postulaciones = leerPostulaciones();
            
            const yaPostulado = postulaciones.some(p => p.estudianteId === estudianteId && p.vacanteId === vacanteId);
            if (yaPostulado) {
                return res.status(400).json({ message: "Ya te has postulado a esta vacante anteriormente." });
            }

            const nuevaPostulacion = {
                id: Date.now().toString(),
                estudianteId,
                vacanteId,
                nombreEstudiante: `${estudiante.nombre} ${estudiante.apellido}`,
                correoEstudiante: estudiante.correoElectronico,
                comentarios: comentarios || "",
                estado: "Pendiente",
                fechaPostulacion: new Date().toISOString()
            };

            postulaciones.push(nuevaPostulacion);
            guardarPostulaciones(postulaciones);

            res.status(201).json({
                message: "Postulación registrada exitosamente.",
                postulacion: nuevaPostulacion
            });
        } catch (error) {
            res.status(500).json({ message: "Error interno al procesar la postulación." });
        }
    }
}

module.exports = new PostulacionController();