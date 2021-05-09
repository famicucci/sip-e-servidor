const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));

// puerto de la app
const PORT = process.env.PORT || 4000;

// rutas
app.use('/', (req, res) => {
	res.json({ hola: 'Mundo' });
});

// arrancar el servidor
app.listen(PORT, () => {
	console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
