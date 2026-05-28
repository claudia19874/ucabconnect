const express = require('express');
const cors = require('cors');
require('dotenv').config();

const ServerConfig = require('./config/ServerConfig');
const postulacionRoutes = require('./routes/PostulacionRoutes');

class App {
    constructor() {
        this.app = express();
        this.configurarMiddlewares();
        this.configurarRutas();
    }

    configurarMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors()); 
    }

    configurarRutas() {
        // Aquí conectamos el archivo de rutas al servidor
        this.app.use(ServerConfig.apiPrefix, postulacionRoutes);
    }

    iniciar() {
        const puerto = ServerConfig.port;
        this.app.listen(puerto, () => {
            console.log(`Servidor de UCAB-Connect ejecutandose en el puerto ${puerto}`);
        });
    }
}

const servidor = new App();
servidor.iniciar();