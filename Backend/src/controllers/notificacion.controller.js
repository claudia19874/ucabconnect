const NotificacionModel = require('../models/notificacion.model');

// 1. GET - Obtener todas las notificaciones
exports.getNotificaciones = (req, res) => {
    try {
        const notificaciones = NotificacionModel.obtenerTodas();
        res.status(200).json(notificaciones);
    } catch (error) {
        res.status(500).json({ error: "Error al leer las notificaciones" });
    }
};

// 2. POST - Crear notificación
exports.crearNotificacion = (req, res) => {
    try {
        const { titulo, mensaje } = req.body;
        if (!titulo || !mensaje) {
            return res.status(400).json({ error: "El título y el mensaje son obligatorios" });
        }

        const nuevaNotificacion = {
            id: Date.now().toString(),
            titulo,
            mensaje,
            fecha: new Date().toISOString(),
            empresaId: "emp_ucab_generica_001"
        };

        NotificacionModel.guardar(nuevaNotificacion);
        res.status(201).json({
            mensaje: "Notificación publicada con éxito",
            notificacion: nuevaNotificacion
        });
    } catch (error) {
        res.status(500).json({ error: "Error al guardar la notificación" });
    }
};

// 3. DELETE - Eliminar una notificación por ID
exports.eliminarNotificacion = (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = NotificacionModel.eliminarPorId(id);
        
        if (!eliminado) {
            return res.status(404).json({ error: "La notificación no existe" });
        }

        res.status(200).json({ mensaje: "Notificación eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la notificación" });
    }
};

// 4. DELETE - Limpiar toda la bandeja
exports.limpiarBandeja = (req, res) => {
    try {
        NotificacionModel.vaciarBandeja();
        res.status(200).json({ mensaje: "Bandeja vaciada con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al vaciar la bandeja" });
    }
};