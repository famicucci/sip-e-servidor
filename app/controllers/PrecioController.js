const { Precio } = require('../models/index');

exports.crearPrecio = async (req, res) => {
	try {
		const precio = await Precio.create({
			ProductoCodigo: req.body.ProductoCodigo,
			ListaPrecioId: req.body.ListaPrecioId,
			pu: req.body.pu,
		});
		res.json(precio);
	} catch (error) {
		res.json(error);
	}
};
