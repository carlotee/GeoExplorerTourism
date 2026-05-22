const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); s
const morgan = require('morgan'); 
require('dotenv').config();

const pool = require('./db'); 

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(helmet()); 
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); 

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Error conectando a PostgreSQL:', err.stack);
    } else {
        console.log('✅ Conexión a PostgreSQL exitosa');
    }
});

app.get('/api', (req, res) => {
    res.json({ 
        status: 'success',
        message: 'GeoExplorerTourism API',
        version: '1.0.0'
    });
});


app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const usuario = result.rows[0];

        if (password === usuario.password) {
            
            return res.status(200).json({
                message: 'Login exitoso',
                token: 'token_valido_generado_por_backend', // Angular guardará esto en localStorage
                user: {
                    id: usuario.id,
                    email: usuario.email
                }
            });
        } else {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

    } catch (error) {
        console.error('Error en el endpoint de login:', error);
        return res.status(500).json({ message: 'Error interno del servidor al consultar la base de datos' });
    }
});

app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    console.error(`[Error]: ${err.message}`);
    res.status(statusCode).json({
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en: http://localhost:${PORT}`);
});

module.exports = app;