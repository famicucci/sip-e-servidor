const { Stock, MovimientoStock } = require('../models/index');

// modificar
exports.modificarStock = async (req, res) => {
	try {
		// si la cantidad resultante es negativa envia al catch (debido a atributo UNSIGNED)
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
