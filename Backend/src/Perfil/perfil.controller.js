const PerfilModel = require('./perfil.model');

const obtenerPerfil = async (req, res) => {
    try {
        // Si viene un id de estudiante lo usamos, si no devolvemos el perfil genérico
        const estudianteId = req.query.id;
        const perfil = await PerfilModel.obtenerPerfilDeDB(estudianteId);
        res.status(200).json(perfil);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

module.exports = { obtenerPerfil };