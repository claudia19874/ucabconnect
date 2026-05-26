const express = require('express');
const cors = require('cors');
const perfilesRoutes = require('./routes/perfiles.routes');

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.use('/api/perfiles', perfilesRoutes);

app.get('/', (req, res) => {
    res.send('Servidor de UCAB Connect corriendo exitosamente.');
});

module.exports = app;