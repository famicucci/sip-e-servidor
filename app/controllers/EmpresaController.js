const { Empresa } = require('../database/db');

exports.crearEmpresa = async (req, res) => {
	try {
		const empresas = await Empresa.create({ nombre: req.body.nombre });
		res.json(empresas);
	} catch (error) {
		res.json(error);
	}
};
