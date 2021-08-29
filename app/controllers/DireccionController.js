const { Direccion } = require('../models/index');

exports.crearDireccion = async (req, res) => {
	try {
		const direccion = await Direccion.create({
			calle: req.body.calle,
			numeroCalle: req.body.numeroCalle,
			piso: req.body.piso,
			depto: req.body.depto,
			barrio: req.body.barrio,
			ciudad: req.body.ciudad,
			provincia: req.body.provincia,
			codPostal: req.body.codPostal,
			refDireccion: req.body.refDireccion,
			ClienteId: req.body.ClienteId,
		});
		res.status(200).json(direccion);
	} catch (error) {
		res.status(400).json(error);
	}
};
