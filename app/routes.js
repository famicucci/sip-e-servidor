const express = require('express');
const router = express.Router();

// importar controladores
// const EmpresaController = require('./controllers/EmpresaController');
const ProductoController = require('./controllers/ProductoController');

// home
router.get('/', (req, res) => {
	res.json({ foo: 'bar ' });
});

// empresas
// router.get('/empresas', EmpresaController.traerEmpresas);

// productos
router.get('/productos', ProductoController.traerProductos);

module.exports = router;
