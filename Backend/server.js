const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DB_FILE = './database.json';

// Middleware
app.use(cors()); // Permite que Angular se conecte sin errores de seguridad
app.use(express.json()); // Permite que Express entienda los datos en formato JSON

// Función auxiliar para leer nuestro archivo database.json
const leerBaseDeDatos = () => {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
};

// Función auxiliar para guardar en nuestro archivo database.json
const guardarBaseDeDatos = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// ==========================================
// ENDPOINTS (RUTAS)
// ==========================================

// 1. ESTUDIANTE: Consultar todas las notificaciones
app.get('/api/notificaciones', (req, res) => {
    try {
        const db = leerBaseDeDatos();
        res.status(200).json(db.notificaciones);
    } catch (error) {
        res.status(500).json({ error: "Error al leer la base de datos" });
    }
});

// 2. EMPRESA: Crear una nueva notificación
app.post('/api/notificaciones', (req, res) => {
    try {
        const { titulo, mensaje } = req.body;
        const db = leerBaseDeDatos();

        // Creamos la nueva notificación con el usuario genérico
        const nuevaNotificacion = {
            id: Date.now().toString(), // Genera un ID único basado en la hora actual
            titulo: titulo,
            mensaje: mensaje,
            fecha: new Date().toISOString(),
            empresaId: "emp_ucab_generica_001" // <--- El usuario genérico que acordamos
        };

        // La agregamos a la lista y guardamos el archivo
        db.notificaciones.push(nuevaNotificacion);
        guardarBaseDeDatos(db);

        // Respondemos a Angular que todo salió bien
        res.status(201).json({
            mensaje: "Notificación publicada con éxito",
            notificacion: nuevaNotificacion
        });

    } catch (error) {
        res.status(500).json({ error: "Error al guardar la notificación" });
    }
});

// ==========================================
// ARRANCAR EL SERVIDOR
// ==========================================
app.listen(PORT, () => {
    console.log(`✅ Servidor Backend corriendo en http://localhost:${PORT}`);
    console.log(`➡️ Endpoint GET:  http://localhost:${PORT}/api/notificaciones`);
    console.log(`➡️ Endpoint POST: http://localhost:${PORT}/api/notificaciones`);
});

// 3. EMPRESA: Eliminar una notificación específica por su ID
app.delete('/api/notificaciones/:id', (req, res) => {
    try {
        const { id } = req.params;
        let db = leerBaseDeDatos();
        
        // Filtramos para dejar fuera la notificación que queremos borrar
        db.notificaciones = db.notificaciones.filter(n => n.id !== id);
        guardarBaseDeDatos(db);

        res.status(200).json({ mensaje: "Notificación eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la notificación" });
    }
});

// 4. ESTUDIANTE: Limpiar todos los datos (Vaciar la bandeja)
app.delete('/api/notificaciones', (req, res) => {
    try {
        let db = leerBaseDeDatos();
        db.notificaciones = []; // Vaciamos el arreglo
        guardarBaseDeDatos(db);

        res.status(200).json({ mensaje: "Bandeja vaciada con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al vaciar la bandeja" });
    }
});