const express = require('express');
const app = express();
require('dotenv').config();
const { sequelize } = require('./models/index');

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));

// puerto de la app
const PORT = process.env.PORT || 4000;

// rutas
app.use(require('./routes'));

// arrancar el servidor
app.listen(PORT, () => {
	console.log(`La aplicación ha arrancado en el puerto: ${PORT}`);

	sequelize.authenticate().then(() => {
		console.log('Se ha establecido la conexión');
	});
});
