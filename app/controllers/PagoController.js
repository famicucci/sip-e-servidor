const { Pago } = require('../models/index');

exports.crearPago = async (req, res) => {
	try {
		const pagos = await Pago.create({
			importe: req.body.importe,
			FacturaId: req.body.FacturaId,
			MetodoPagoId: req.body.MetodoPagoId,
			UsuarioId: req.usuarioId,
		});
		res.json(pagos);
	} catch (error) {
		res.json(error);
	}
};
