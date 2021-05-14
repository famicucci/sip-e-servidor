const { Usuario } = require('../models/index');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');

exports.registroUsuario = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errores: errors.array() });
	}

	try {
		req.body.password = bcryptjs.hashSync(req.body.password, 10);
		const usuarios = await Usuario.create({
			nombre: req.body.nombre,
			password: req.body.password,
			usuario: req.body.usuario,
			rol: req.body.rol,
			EmpresaId: req.body.EmpresaId,
		});
		res.json({ success: 'Usuario creado' });
	} catch (error) {
		res.json(error);
	}
};

exports.loginUsuario = async (req, res) => {
	const usuario = await Usuario.findOne({
		where: { usuario: req.body.usuario },
	});
	if (usuario) {
		const iguales = bcryptjs.compareSync(req.body.password, usuario.password);

		if (iguales) {
			res.json({ success: createToken(usuario) });
		} else {
			res.json({ error: 'Error n usuario y/o contraseña' });
		}
	} else {
		res.json({ error: 'Error en usuario y/o contraseña' });
	}
};

// eliminar
exports.eliminarUsuario = async (req, res) => {
	try {
		const usuario = await Usuario.destroy({
			where: { id: req.params.UsuarioId },
		});
		res.json({ success: 'El usuario ha sido eliminado' });
	} catch (error) {
		res.json(error);
	}
};

// modificar
exports.modificarUsuario = async (req, res) => {
	try {
		const usuarios = await Usuario.create({
			nombre: req.body.nombre,
			password: req.body.password,
			usuario: req.body.usuario,
			rol: req.body.rol,
			EmpresaId: req.body.EmpresaId,
		});
		res.json(usuarios);
	} catch (error) {
		res.json(error);
	}
};

// funcion para crear el token de login
const createToken = (usuario) => {
	const payload = {
		usuarioId: usuario.id,
		usuarioRol: usuario.rol,
		usuarioEmpresaId: usuario.EmpresaId,
		createAt: moment().unix(),
		expiredAt: moment().add(24, 'hours').unix(),
	};
	return jwt.encode(payload, 'frase secreta');
};
