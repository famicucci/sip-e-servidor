const { Usuario } = require('../models/index');
const bcryptjs = require('bcryptjs');

exports.registroUsuario = async (req, res) => {
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

// modificar
// encontrar el usuario por el id y modificarlo
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

// registro

// eliminar
