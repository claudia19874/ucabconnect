const path = require('path');

module.exports = {
    // Apunta de forma segura al archivo database.json en la raíz del Backend
    DB_FILE: path.join(__dirname, '../database.json')
};