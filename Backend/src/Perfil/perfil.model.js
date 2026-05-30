const fs = require('fs');
const path = require('path');

// Asumiendo que database.json está en la raíz del backend (2 carpetas hacia atrás)
const dbPath = path.join(__dirname, '../../database.json');

const obtenerPerfilDeDB = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(dbPath, 'utf8', (err, data) => {
            if (err) {
                return reject('Error leyendo la base de datos');
            }
            try {
                const db = JSON.parse(data);
                resolve(db.perfil || {});
            } catch (e) {
                reject('Error de formato en la base de datos');
            }
        });
    });
};

module.exports = {
    obtenerPerfilDeDB
};