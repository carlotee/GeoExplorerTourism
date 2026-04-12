const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // Seguridad adicional
const morgan = require('morgan'); // Logging de peticiones
require('dotenv').config();

// Importar la conexión a la DB (basado en tu archivo db.js existente)
const pool = require('./db'); 

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middlewares ---
app.use(helmet()); // Protege encabezados HTTP
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Ver las rutas que se llaman en la consola

// --- Verificación de Conexión a la DB ---
// Útil para debugging inicial
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Error conectando a PostgreSQL:', err.stack);
    } else {
        console.log('✅ Conexión a PostgreSQL exitosa');
    }
});

// --- Rutas ---
// Es mejor separar las rutas en archivos (ej: routes/lugares.js)
// Pero por ahora, centralizamos el prefijo /api
app.get('/api', (req, res) => {
    res.json({ 
        status: 'success',
        message: 'GeoExplorerTourism API',
        version: '1.0.0'
    });
});

// --- Manejo de Rutas No Encontradas (404) ---
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// --- Manejo de Errores Global ---
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    console.error(`[Error]: ${err.message}`);
    res.status(statusCode).json({
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
});

// --- Iniciar servidor ---
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en: http://localhost:${PORT}`);
});

module.exports = app;