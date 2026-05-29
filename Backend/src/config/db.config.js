const path = require('path');

module.exports = {
    // Sube dos niveles para salir de config y de src
    DB_FILE: path.join(__dirname, '../../database.json'),
    // Apunta de forma segura al archivo database.json en la raíz del Backend
    DB_FILE: path.join(__dirname, '../database.json')
};