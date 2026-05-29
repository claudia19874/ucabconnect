const PostulacionRepository = require('../repositories/PostulacionRepository');
const Postulacion = require('../models/Postulacion');
const crypto = require('crypto');

class PostulacionService {
    
    procesarPostulacion(datosEstudiante, idVacante) {
        // Aseguramos que existan los datos para evitar errores de "undefined"
        const sede = datosEstudiante.sede ? datosEstudiante.sede.trim() : '';
        const carrera = datosEstudiante.carrera ? datosEstudiante.carrera.trim() : '';
        const correoLimpio = datosEstudiante.correo ? datosEstudiante.correo.trim().toLowerCase() : '';

        // localeCompare devuelve 0 si los textos coinciden (ignorando tildes y mayúsculas)
        const esSedeValida = sede.localeCompare('Montalban', 'es', { sensitivity: 'base' }) === 0;
        const esCarreraValida = carrera.localeCompare('Ingenieria Informatica', 'es', { sensitivity: 'base' }) === 0;

        // 1. Validar restricciones del Brief
        if (!esSedeValida || !esCarreraValida) {
            throw new Error('No cumple con los requisitos para esta vacante');
        }

        if (!correoLimpio.endsWith('@est.ucab.edu.ve')) {
            throw new Error('No cumple con los requisitos para esta vacante');
        }

        // 2. Verificar duplicados
        const yaPostulado = PostulacionRepository.existePostulacionPrevia(datosEstudiante.id, idVacante);
        if (yaPostulado) {
            throw new Error('Ya te postulaste a esta pasantia');
        }

        // 3. Registrar la postulación
        const idGenerado = crypto.randomUUID();
        const nuevaPostulacion = new Postulacion(idGenerado, datosEstudiante.id, idVacante);
        
        PostulacionRepository.guardar(nuevaPostulacion);

        return {
            mensaje: 'Postulacion enviada exitosamente',
            postulacion: nuevaPostulacion
        };
    }

    obtenerPostulacionesPorEstudiante(idEstudiante) {
        const todas = PostulacionRepository.obtenerTodas();
        return todas.filter(p => p.idEstudiante === idEstudiante);
    }
}

module.exports = new PostulacionService();