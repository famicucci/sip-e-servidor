const { Usuario } = require('../models/index');

exports.crearUsuario = async (req, res) => {
	try {
		const usuarios = await Usuario.create(req.body);
		res.json(usuarios);
	} catch (error) {
		res.json(error);
	}
};
