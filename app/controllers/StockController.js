const { Stock, MovimientoStock } = require('../models/index');

// modificar
exports.modificarStock = async (req, res) => {
	try {
		const cantActual = await Stock.findOne({
			attributes: ['cantidad'],
			where: {
				ProductoCodigo: req.body.ProductoCodigo,
				PtoStockId: req.body.PtoStockId,
			},
		});

		// revisa si la cantidad final es negativa
		if (cantActual.cantidad + req.body.cantidad < 0) {
			res.json({ error: 'El stock no puede ser negativo' });
			return;
		}

		// si el producto no existe envía al catch
		const modificaStock = await Stock.increment('cantidad', {
			by: req.body.cantidad,
			where: {
				ProductoCodigo: req.body.ProductoCodigo,
				PtoStockId: req.body.PtoStockId,
			},
		});

		// insert en tabla movimientos
		const registraMovimiento = await MovimientoStock.create({
			cantidad: req.body.cantidad,
			motivo: req.body.motivo,
			ProductoCodigo: req.body.ProductoCodigo,
			PtoStockId: req.body.PtoStockId,
			UsuarioId: req.usuarioId,
		});
		res.json({ success: 'Cambio en stock exitoso' });
	} catch (error) {
		res.json({ error: 'Ocurrió un error' });
	}
};
