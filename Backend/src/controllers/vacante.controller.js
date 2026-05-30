const fs = require('fs');
const path = require('path');

const vacantesFilePath = path.join(__dirname, '../data/vacante.json');

const leerArchivoJSON = () => {
    try {
        if (!fs.existsSync(vacantesFilePath)) {
            const carpetaData = path.dirname(vacantesFilePath);
            if (!fs.existsSync(carpetaData)) {
                fs.mkdirSync(carpetaData, { recursive: true });
            }
            fs.writeFileSync(vacantesFilePath, JSON.stringify([]), 'utf-8');
            return [];
        }
        const data = fs.readFileSync(vacantesFilePath, 'utf-8');
        if (!data.trim()) {
            return [];
        }
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const escribirArchivoJSON = (data) => {
    fs.writeFileSync(vacantesFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

const obtenerVacantes = (req, res) => {
    try {
        const vacantes = leerArchivoJSON();
        res.status(200).json(vacantes);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor al cargar las vacantes.' });
    }
};

const crearVacante = (req, res) => {
    try {
        const vacantes = leerArchivoJSON();

        const nuevaVacante = {
            id: Date.now().toString(),
            titulo: req.body.titulo,
            ubicacion: req.body.ubicacion,
            salario: req.body.salario,
            duracion: req.body.duracion,
            modalidad: req.body.modalidad,
            descripcion: req.body.descripcion,
            requisitos: req.body.requisitos || [],
            sector: req.body.sector,
            estado: 'Activa',
            fechaPublicacion: new Date().toISOString()
        };

        vacantes.push(nuevaVacante);
        escribirArchivoJSON(vacantes);

        res.status(201).json({ message: 'Vacante publicada exitosamente.', vacante: nuevaVacante });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor al publicar la vacante.' });
    }
};

const cerrarVacante = (req, res) => {
    try {
        const { id } = req.params;
        const vacantes = leerArchivoJSON();

        const indice = vacantes.findIndex(v => v.id === id);

        if (indice === -1) {
            return res.status(404).json({ message: 'La vacante no existe.' });
        }

        vacantes[indice].estado = 'Cerrada';
        escribirArchivoJSON(vacantes);

        res.status(200).json({ message: 'Vacante clausurada con éxito.', vacante: vacantes[indice] });
    } catch (error) {
        res.status(500).json({ message: 'Error interno al procesar el cierre de la vacante.' });
    }
};

module.exports = {
    obtenerVacantes,
    crearVacante,
    cerrarVacante
};