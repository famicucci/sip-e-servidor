const { Usuario } = require('../models/index');

exports.crearUsuario = async (req, res) => {
	try {
		const usuarios = await Usuario.create({
			nombre: req.body.nombre,
			clave: req.body.clave,
			usuario: req.body.usuario,
			rol: req.body.rol,
			EmpresaId: req.body.EmpresaId,
		});
		res.json(usuarios);
	} catch (error) {
		res.json(error);
	}
};

// modificar
