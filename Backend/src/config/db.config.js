const path = require('path');

// Apuntamos directamente a la subcarpeta 'data' de forma centralizada
const DB_FILE = path.join(__dirname, '../data/database.json');

module.exports = {
    DB_FILE
};