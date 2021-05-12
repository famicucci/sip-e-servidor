const { Stock } = require('../models/index');

// crear
exports.crearStockProducto = async (req, res) => {
	try {
		const stockProducto = await Stock.create({
			ProductoCodigo: req.body.ProductoCodigo,
			cantidad: req.body.cantidad,
			PtoStockId: req.body.PtoStockId,
		});
		res.json(stockProducto);
	} catch (error) {
		console.log(req.body);
		res.json(error);
	}
};

// modificar
