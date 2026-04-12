const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas básicas
app.get('/', (req, res) => {
    res.json({ message: 'GeoExplorerTourism API' });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});

module.exports = app;