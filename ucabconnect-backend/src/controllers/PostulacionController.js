const PostulacionService = require('../services/PostulacionService');

class PostulacionController {
    
    crearPostulacion(req, res) {
        try {
            const { estudiante, idVacante } = req.body;
            
            if (!estudiante || !idVacante) {
                return res.status(400).json({ 
                    error: 'Faltan datos obligatorios para procesar la postulacion' 
                });
            }

            const resultado = PostulacionService.procesarPostulacion(estudiante, idVacante);
            return res.status(201).json(resultado);
        } catch (error) {
        
            return res.status(422).json({ error: error.message });
        }
    }

    obtenerPorEstudiante(req, res) {
        try {
            const { idEstudiante } = req.params;
            const postulaciones = PostulacionService.obtenerPostulacionesPorEstudiante(idEstudiante);
            return res.status(200).json(postulaciones);
        } catch (error) {
            return res.status(500).json({ error: 'Error interno al consultar las postulaciones' });
        }
    }
}

module.exports = new PostulacionController();