const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../database.json');

// GET - Obtener vacantes de una empresa
const obtenerVacantesPorEmpresa = (req, res) => {
    const empresaId = req.params.id;

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al leer la base de datos' });
        try {
            const db = JSON.parse(data);
            const vacantesEmpresa = db.pasantias.filter(v => v.empresaId === empresaId);
            res.status(200).json(vacantesEmpresa);
        } catch (e) {
            res.status(500).json({ error: 'Error en el formato de los datos' });
        }
    });
};

// POST - Publicar nueva vacante
const crearVacante = (req, res) => {
    const nuevaVacante = req.body;

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al leer la base de datos' });
        try {
            const db = JSON.parse(data);

            nuevaVacante.id = 'pas_' + Math.floor(Math.random() * 10000);
            nuevaVacante.estado = 'Activa';
            nuevaVacante.aplicantes = 0;
            nuevaVacante.aplicado = false;

            const empresaAsociada = db.empresas.find(e => e.id === nuevaVacante.empresaId);
            nuevaVacante.empresa = empresaAsociada ? empresaAsociada.nombre : 'Empresa Aliada';

            db.pasantias.unshift(nuevaVacante);

            fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
                if (err) return res.status(500).json({ error: 'Error al escribir en la base de datos' });
                res.status(201).json({ mensaje: '¡Vacante creada con éxito!', vacante: nuevaVacante });
            });
        } catch (e) {
            res.status(500).json({ error: 'Error procesando los datos de la vacante' });
        }
    });
};

// PUT - Cerrar vacante (cambiar estado a 'Cerrada')
const cerrarVacante = (req, res) => {
    const idVacante = req.params.id;

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al leer la base de datos' });
        try {
            const db = JSON.parse(data);

            const index = db.pasantias.findIndex(v => v.id === idVacante);
            if (index === -1) {
                return res.status(404).json({ error: 'Vacante no encontrada' });
            }

            db.pasantias[index].estado = 'Cerrada';

            fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
                if (err) return res.status(500).json({ error: 'Error al guardar los cambios' });
                res.status(200).json({ mensaje: 'Vacante cerrada con éxito', vacante: db.pasantias[index] });
            });
        } catch (e) {
            res.status(500).json({ error: 'Error procesando la solicitud' });
        }
    });
};

module.exports = {
    obtenerVacantesPorEmpresa,
    crearVacante,
    cerrarVacante
};