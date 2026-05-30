const PerfilModel = require('./perfil.model');

const obtenerPerfil = async (req, res) => {
    try {
        // Llama al modelo para obtener los datos
        const perfil = await PerfilModel.obtenerPerfilDeDB();
        
        // Responde al frontend con éxito
        res.status(200).json(perfil);
    } catch (error) {
        // Si hay un error, responde con el código 500
        res.status(500).json({ error: error });
    }
};

module.exports = {
    obtenerPerfil
};