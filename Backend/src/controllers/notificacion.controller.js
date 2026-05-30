const fs = require('fs');
const { DB_FILE } = require('../config/db.config');

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

class NotificacionController {

    obtenerNotificaciones(req, res) {
        try {
            const db = leerBaseDeDatos();
            res.status(200).json(db.notificaciones || []);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener las notificaciones." });
        }
    }

    crearNotificacion(req, res) {
        try {
            const { usuarioId, titulo, mensaje, tipo } = req.body;

            if (!titulo || !mensaje) {
                return res.status(400).json({ message: "El título y el mensaje son obligatorios." });
            }

            const db = leerBaseDeDatos();
            
            const nuevaNotificacion = {
                id: Date.now().toString(),
                usuarioId: usuarioId || "TODOS",
                titulo,
                mensaje,
                tipo: tipo || "INFO",
                leido: false,
                fecha: new Date().toISOString()
            };

            if (!db.notificaciones) {
                db.notificaciones = [];
            }

            db.notificaciones.push(nuevaNotificacion);
            guardarBaseDeDatos(db);

            res.status(201).json({
                message: "Notificación creada con éxito.",
                notificacion: nuevaNotificacion
            });
        } catch (error) {
            res.status(500).json({ message: "Error interno al crear la notificación." });
        }
    }
}

module.exports = new NotificacionController();