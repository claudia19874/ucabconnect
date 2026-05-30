const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../database.json');

const leerDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
const guardarDB = (db) => fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

// POST /api/auth/login
exports.login = (req, res) => {
    const { correo, password, tipo } = req.body;

    if (!correo || !password || !tipo) {
        return res.status(400).json({ error: 'Faltan datos obligatorios.' });
    }

    const db = leerDB();

    if (tipo === 'estudiante') {
        const estudiante = db.estudiantes?.find(
            e => e.correo === correo && e.password === password
        );
        if (!estudiante) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
        }
        const { password: _, ...usuarioSinPassword } = estudiante;
        return res.status(200).json({ usuario: usuarioSinPassword });
    }

    if (tipo === 'empresa') {
        const empresa = db.empresas?.find(
            e => e.correo === correo && e.password === password
        );
        if (!empresa) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
        }
        const { password: _, ...empresaSinPassword } = empresa;
        return res.status(200).json({ usuario: empresaSinPassword });
    }

    return res.status(400).json({ error: 'Tipo de usuario inválido.' });
};

// POST /api/auth/registro/estudiante
exports.registrarEstudiante = (req, res) => {
    const { correo, cedula } = req.body;
    const db = leerDB();

    if (!db.estudiantes) db.estudiantes = [];

    const existe = db.estudiantes.some(e => e.correo === correo || e.cedula === cedula);
    if (existe) {
        return res.status(400).json({ error: 'Ya existe un estudiante con ese correo o cédula.' });
    }

    const nuevoEstudiante = {
        id: 'est_' + Date.now(),
        ...req.body
    };

    db.estudiantes.push(nuevoEstudiante);
    guardarDB(db);

    return res.status(201).json({ mensaje: 'Estudiante registrado con éxito.' });
};

// POST /api/auth/registro/empresa
exports.registrarEmpresa = (req, res) => {
    const { correo, rif, codigoAcceso } = req.body;

    // Código de acceso fijo para demo — puedes cambiarlo
    const CODIGO_VALIDO = '202612345678';
    if (codigoAcceso !== CODIGO_VALIDO) {
        return res.status(400).json({ error: 'Código de acceso inválido.' });
    }

    const db = leerDB();

    if (!db.empresas) db.empresas = [];

    const existe = db.empresas.some(e => e.correo === correo || e.rif === rif);
    if (existe) {
        return res.status(400).json({ error: 'Ya existe una empresa con ese correo o RIF.' });
    }

    const nuevaEmpresa = {
        id: 'emp_' + Date.now(),
        ...req.body,
        ofertasCerradas: 0
    };

    db.empresas.push(nuevaEmpresa);
    guardarDB(db);

    return res.status(201).json({ mensaje: 'Empresa registrada con éxito.' });
};