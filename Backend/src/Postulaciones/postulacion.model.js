const fs = require('fs');
const { DB_FILE } = require('../config/db.config');

const leerBaseDeDatos = () => {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return { postulaciones: [] };
    }
};

class PostulacionModel {
    static obtenerTodas() {
        const db = leerBaseDeDatos();
        // Si no existe el arreglo por alguna razón, devuelve uno vacío
        return db.postulaciones || [];
    }
}

module.exports = PostulacionModel;