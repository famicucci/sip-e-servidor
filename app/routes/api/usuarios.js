const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const UsuarioController = require('../../controllers/UsuarioController');

// registro
router.post(
	'/registro',
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

// login
router.post('/login', UsuarioController.loginUsuario);

module.exports = router;
