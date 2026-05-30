const app = require('./src/app');
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` Servidor de UCAB Connect Inicializado desde Cero `);
    console.log(` Corriendo en: http://localhost:${PORT}`);
    console.log(`====================================================`);
});