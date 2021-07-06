const {
	Factura,
	FacturaDetalle,
	Usuario,
	Cliente,
	Orden,
	OrdenEstado,
} = require('../models/index');
const { sequelize } = require('../models/index');
const { Op } = require('sequelize');

exports.crearFactura = async (req, res) => {
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
		await t.rollback();
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

// traer facturas de ordenes no finalizadas y no canceladas
exports.traerFacturas = async (req, res) => {
	try {
		const facturas = await Factura.findAll({
			include: [
				{ model: Usuario, attributes: ['usuario'] },
				{ model: Cliente, attributes: ['nombre', 'apellido'] },
				{
					model: Orden,
					attributes: [],
					include: [
						{
							model: OrdenEstado,
							attributes: ['descripcion'],
						},
					],
				},
			],
		});
		res.status(200).json(facturas);
	} catch (error) {
		res.json(error);
	}
};

// traer facturas de ordenes no finalizadas y no canceladas
exports.traerFacturasCliente = async (req, res) => {
	try {
		const facturas = await Factura.findAll({
			where: { ClienteId: req.params.Id },
		});
		res.status(200).json(facturas);
	} catch (error) {
		res.json(error);
	}
};

exports.traerFactura = async (req, res) => {
	try {
		const facturas = await Factura.findOne({
			attributes: { exclude: ['ClienteId', 'UsuarioId'] },
			include: [
				{ model: Cliente, attributes: ['id', 'nombre', 'apellido'] },
				{ model: Usuario, attributes: ['usuario'] },
				{
					model: FacturaDetalle,
					as: 'detalleFactura',
					attributes: { exclude: ['FacturaId'] },
				},
			],
			where: { id: req.params.Id },
		});
		res.status(200).json(facturas);
	} catch (error) {
		res.json(error);
	}
};
