const express = require('express');
const router = express.Router();

// importar controladores
const EmpresaController = require('./controllers/EmpresaController');
const UsuarioController = require('./controllers/UsuarioController');
const ProductoController = require('./controllers/ProductoController');

// home
router.get('/api', (req, res) => {
	res.json({ foo: 'bar ' });
});

// empresas
router.post('/api/empresas', EmpresaController.crearEmpresa);

// usuarios
router.post('/api/usuarios/registro', UsuarioController.registroUsuario);
// router.post('/api/usuarios/login', UsuarioController.crearUsuario);

// productos
router.get('/api/productos', ProductoController.traerProductos);
router.post('/api/productos', ProductoController.crearProducto);
router.put(
	'/api/productos/:ProductoCodigo',
	ProductoController.modificarProducto
);
router.delete(
	'/api/productos/:ProductoCodigo',
	ProductoController.eliminarProducto
);

module.exports = router;
