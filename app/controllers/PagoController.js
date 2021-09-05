const { Pago, Factura } = require('../models/index');

exports.crearPago = async (req, res) => {
	try {
		const pagos = await Pago.create({
			importe: req.body.importe,
			FacturaId: req.body.FacturaId,
			MetodoPagoId: req.body.MetodoPagoId,
			createdAt: req.body.createdAt,
			UsuarioId: req.usuarioId,
		});

		let invoiceTotalAmount;
		let paymentsTotalAmount = 0;

		// get total amount of current invoice
		const invoice = await Factura.findByPk(req.body.FacturaId);
		if (invoice) invoiceTotalAmount = parseFloat(invoice.importeFinal);

		// get all payments of current invoice
		const payments = await Pago.findAll({
			where: { FacturaId: req.body.FacturaId },
		});

		if (payments) {
			payments.forEach((x) => {
				paymentsTotalAmount += parseFloat(x.importe);
			});
		}

		//  result
		const result = invoiceTotalAmount - paymentsTotalAmount;

		if (result === 0)
			await Factura.update(
				{
					estadoPago: 'Pago',
				},
				{ where: { id: req.body.FacturaId } }
			);

		res.json(pagos);
	} catch (error) {
		res.status(400).json({ msg: 'There was an error', severity: 'error' });
	}
};

exports.cancelPayment = async (req, res) => {
	try {
		// select payment to be canceled
		const payment = await Pago.findByPk(req.params.Id);

		if (payment) {
			const negativePayment = await Pago.create({
				importe: -payment.importe,
				FacturaId: payment.FacturaId,
				MetodoPagoId: req.body.MetodoPagoId,
				UsuarioId: req.usuarioId,
			});

			// update estadoPago in invoice with: 'Pendiente'
			await Factura.update(
				{
					estadoPago: 'Pendiente',
				},
				{ where: { id: payment.FacturaId } }
			);

			res.status(200).json(negativePayment);
		} else {
			res.status(400).json({ msg: 'Payment doesn´t exist', severity: 'error' });
		}
	} catch (error) {
		res.status(400).json({ msg: 'There was an error', severity: 'error' });
	}
};
