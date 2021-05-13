const { Stock } = require('../models/index');

// crear
// exports.crearStock = async (req, res) => {
// 	try {
// 		const stock = await Stock.create({
// 			ProductoCodigo: req.body.ProductoCodigo,
// 			cantidad: req.body.cantidad,
// 			PtoStockId: req.body.PtoStockId,
// 		});
// 		res.json(stock);
// 	} catch (error) {
// 		console.log(req.body);
// 		res.json(error);
// 	}
// };

// modificar
exports.modificarStock = async (req, res) => {
	try {
		const stock = await Stock.update(
			{
				cantidad: req.body.cantidad,
			},
			{
				where: {
					ProductoCodigo: req.params.ProductoCodigo,
					PtoStockId: req.params.PtoStockId,
				},
			}
		);
		res.json({ success: 'El producto ha sido modificado' });
	} catch (error) {
		res.json(error);
	}
};
