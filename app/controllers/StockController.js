const { Stock } = require('../models/index');

// modificar
exports.modificarStock = async (req, res) => {
	const target = {
		ProductoCodigo: req.body.ProductoCodigo,
		PtoStockId: req.body.PtoStockId,
	};

	const modificaStock = await Stock.increment('cantidad', {
		by: req.body.cantidad,
		where: target,
	});

	// insert en tabla movimientos
};

// const comprueba = await Stock.findOne({
// 	where: target,
// });
// res.json(comprueba);
