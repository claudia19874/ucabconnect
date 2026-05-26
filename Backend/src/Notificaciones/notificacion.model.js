const fs = require('fs');
const path = require('path');

// Sube dos niveles (de Notificaciones/ y src/) hasta llegar a Backend/
const DB_FILE = path.join(__dirname, '../../database.json');

// Funciones internas de lectura/escritura en el archivo físico
const leerBaseDeDatos = () => {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return { notificaciones: [] };
    }
};

const guardarBaseDeDatos = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

class NotificacionModel {
    static obtenerTodas() {
        const db = leerBaseDeDatos();
        return db.notificaciones;
    }

    static guardar(nuevaNotificacion) {
        const db = leerBaseDeDatos();
        db.notificaciones.push(nuevaNotificacion);
        guardarBaseDeDatos(db);
        return nuevaNotificacion;
    }

    static eliminarPorId(id) {
        let db = leerBaseDeDatos();
        const existe = db.notificaciones.some(n => n.id === id);
        if (!existe) return false;

        db.notificaciones = db.notificaciones.filter(n => n.id !== id);
        guardarBaseDeDatos(db);
        return true;
    }

    static vaciarBandeja() {
        let db = leerBaseDeDatos();
        db.notificaciones = [];
        guardarBaseDeDatos(db);
        return true;
    }
}

module.exports = NotificacionModel;