const PostulacionModel = require('./postulacion.model');

exports.getPostulaciones = (req, res) => {
    try {
        const postulaciones = PostulacionModel.obtenerTodas();
        res.status(200).json(postulaciones);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las postulaciones" });
    }
};