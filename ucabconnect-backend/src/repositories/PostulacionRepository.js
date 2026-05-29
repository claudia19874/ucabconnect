const fs = require('fs');
const path = require('path');
const Postulacion = require('../models/Postulacion');

class PostulacionRepository {
    constructor() {
        this.filePath = path.join(__dirname, '../../data/postulaciones.json');
        this.asegurarArchivoExiste();
    }

    asegurarArchivoExiste() {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([]));
        }
    }

    obtenerTodas() {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data);
    }

    guardar(postulacion) {
        const postulaciones = this.obtenerTodas();
        postulaciones.push(postulacion);
        fs.writeFileSync(this.filePath, JSON.stringify(postulaciones, null, 2));
        return postulacion;
    }

    existePostulacionPrevia(idEstudiante, idVacante) {
        const postulaciones = this.obtenerTodas();
        return postulaciones.some(p => p.idEstudiante === idEstudiante && p.idVacante === idVacante);
    }
}

module.exports = new PostulacionRepository();