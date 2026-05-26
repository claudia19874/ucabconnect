const fs = require('fs');
const path = require('path');

const vacantesFilePath = path.join(__dirname, '../data/vacante.json');

// Función auxiliar blindada para leer el JSON de forma segura
const leerArchivoJSON = () => {
    try {
        if (!fs.existsSync(vacantesFilePath)) {
            return []; // Si el archivo no existe, devuelve lista vacía
        }
        const data = fs.readFileSync(vacantesFilePath, 'utf-8');
        if (!data.trim()) {
            return []; // Si el archivo está en blanco, devuelve lista vacía
        }
        return JSON.parse(data);
    } catch (error) {
        console.error('Error interno al parsear el JSON:', error);
        return []; // En caso de cualquier corrupción, evita que el servidor colapse
    }
};

// HU 1: Obtener y ver todas las vacantes
const obtenerVacantes = (req, res) => {
    try {
        const vacantes = leerArchivoJSON();
        res.status(200).json(vacantes);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor al cargar las vacantes.' });
    }
};

// HU 2: Publicar Nueva Vacante
const crearVacante = (req, res) => {
    try {
        const vacantes = leerArchivoJSON();

        // Estructuración del nuevo objeto
        const nuevaVacante = {
            id: Date.now().toString(), // Usamos Date.now() para generar un ID único infalible
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

        // Escritura en el archivo
        fs.writeFileSync(vacantesFilePath, JSON.stringify(vacantes, null, 2), 'utf-8');

        res.status(201).json({ message: 'Vacante publicada exitosamente.', vacante: nuevaVacante });
    } catch (error) {
        console.error('Error crítico al guardar la vacante:', error);
        res.status(500).json({ message: 'Error interno del servidor al publicar la vacante.' });
    }
};

// HU 3: Cerrar Vacante
const cerrarVacante = (req, res) => {
    try {
        const { id } = req.params;
        const vacantes = leerArchivoJSON();

        const indice = vacantes.findIndex(v => v.id === id);

        if (indice === -1) {
            return res.status(404).json({ message: 'La vacante no existe.' });
        }

        vacantes[indice].estado = 'Cerrada';

        fs.writeFileSync(vacantesFilePath, JSON.stringify(vacantes, null, 2), 'utf-8');

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