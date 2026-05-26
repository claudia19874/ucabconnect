const path = require('path');

module.exports = {
    // Sube dos niveles para salir de config y de src
    DB_FILE: path.join(__dirname, '../../database.json')
};