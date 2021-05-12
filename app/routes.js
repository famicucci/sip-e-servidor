const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

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
router.post(
	'/api/usuarios/registro',
	[
		check('nombre', 'El nombre y apellido son obligatorios').not().isEmpty(),
		check('password', 'El password es obligatorio').not().isEmpty(),
		check('usuario', 'El usuario es obligatorio').not().isEmpty(),
		check('rol', 'El rol de usuario es obligatorio').not().isEmpty(),
		check('EmpresaId', 'El nombre de la empresa es obligatorio')
			.not()
			.isEmpty(),
	],
	UsuarioController.registroUsuario
);
router.post('/api/usuarios/login', UsuarioController.loginUsuario);

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
