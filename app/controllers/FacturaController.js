const { Factura, Usuario, Cliente } = require('../models/index');
const { sequelize } = require('../models/index');

exports.crearFactura = async (req, res) => {
	console.log(req.body.detalleFactura);
	// rollback
	const t = await sequelize.transaction();

	try {
		const factura = await Factura.create(
			{
				observaciones: req.body.observaciones,
				estadoPago: req.body.estadoPago,
				importe: req.body.importe,
				descuento: req.body.descuento,
				tarifaEnvio: req.body.tarifaEnvio,
				importeFinal: req.body.importeFinal,
				tipo: req.body.tipo,
				estado: req.body.estado,
				ClienteId: req.body.ClienteId,
				OrdenId: req.body.OrdenId,
				UsuarioId: req.usuarioId,
				detalleFactura: req.body.detalleFactura,
			},
			{
				include: 'detalleFactura',
				transaction: t,
			}
		);
		await t.commit();
		res.status(200).json(factura);
	} catch (error) {
		res.json(error);
	}
};

exports.modificarFactura = async (req, res) => {
	try {
		const factura = await Factura.update(
			{
				observaciones: req.body.observaciones,
				estadoPago: req.body.estadoPago,
				estado: req.body.estado,
			},
			{ where: { id: req.params.Id } }
		);

		if (factura) {
			res.status(200).send({
				msg: 'La factura ha sido modificada!',
				severity: 'success',
			});
		} else {
			res.status(400).send({
				msg: 'No se produjo ningún cambio en la base de datos',
				severity: 'error',
			});
		}
	} catch (error) {
		res.json(error);
	}
};

exports.traerFacturas = async (req, res) => {
	try {
		const facturas = await Factura.findAll({
			include: [
				{ model: Usuario, attributes: ['usuario'] },
				{ model: Cliente, attributes: ['nombre', 'apellido'] },
			],
		});
		res.status(200).json(facturas);
	} catch (error) {
		res.json(error);
	}
};
