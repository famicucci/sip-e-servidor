const express = require('express');
const router = express.Router();
// const { check } = require('express-validator');

const apiProductosRouter = require('./api/productos');

router.use('/productos', apiProductosRouter);

// importar controladores
// const EmpresaController = require('../controllers/EmpresaController');
// const UsuarioController = require('../controllers/UsuarioController');

// empresas
// router.post('/api/empresas', EmpresaController.crearEmpresa);

// usuarios
// router.post(
// 	'/api/usuarios/registro',
// 	[
// 		check('nombre', 'El nombre y apellido son obligatorios').not().isEmpty(),
// 		check('password', 'El password es obligatorio').not().isEmpty(),
// 		check('usuario', 'El usuario es obligatorio').not().isEmpty(),
// 		check('rol', 'El rol de usuario es obligatorio').not().isEmpty(),
// 		check('EmpresaId', 'El nombre de la empresa es obligatorio')
// 			.not()
// 			.isEmpty(),
// 	],
// 	UsuarioController.registroUsuario
// );
// router.post('/api/usuarios/login', UsuarioController.loginUsuario);

module.exports = router;
