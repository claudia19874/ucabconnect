const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../database.json');

const obtenerPerfilDeDB = (estudianteId) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dbPath, 'utf8', (err, data) => {
            if (err) return reject('Error leyendo la base de datos');
            try {
                const db = JSON.parse(data);

                // Si viene un id, buscamos al estudiante en el arreglo de estudiantes
                if (estudianteId && db.estudiantes) {
                    const estudiante = db.estudiantes.find(e => e.id === estudianteId);
                    if (estudiante) {
                        const { password, ...perfilSinPassword } = estudiante;
                        return resolve(perfilSinPassword);
                    }
                }

                // Fallback al perfil genérico del JSON
                resolve(db.perfil || {});
            } catch (e) {
                reject('Error de formato en la base de datos');
            }
        });
    });
};

module.exports = { obtenerPerfilDeDB };