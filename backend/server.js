const app = require('./src/app');
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`Servidor activo `);
    console.log(`====================================================`);
});