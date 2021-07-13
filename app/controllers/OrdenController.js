const {
	Orden,
	OrdenDetalle,
	OrdenEstado,
	Stock,
	PtoStock,
	PtoVenta,
	MovimientoStock,
	Factura,
	FacturaDetalle,
	Cliente,
	Pago,
	MetodoPago,
	Usuario,
	TipoEnvio,
	Producto,
	Direccion,
} = require('../models/index');
const { Op } = require('sequelize');
const { sequelize } = require('../models/index');

exports.crearOrden = async (req, res) => {
	// traer todos los stocks de productos
	const stocks = await Stock.findAll({
		attributes: { exclude: ['updatedAt'] },
	});

	let prodsSinStock = [];
	let cantsFinales = [];
	let detalleOrden = req.body.detalleOrden;

	// verifico que detalle orden no tenga un producto en cero, si lo tiene lo elimino
	detalleOrden = detalleOrden.filter((x) => x.cantidad !== 0);

	for (let k = 0; k < detalleOrden.length; k++) {
		const element = detalleOrden[k];
		const cantProdCarr = element.cantidad;

		// esto lo tiene que hacer si el producto esta disponible
		if (element.PtoStockId !== null) {
			const prodStock = stocks.find(
				(x) =>
					x.ProductoCodigo === element.ProductoCodigo &&
					x.PtoStockId === element.PtoStockId
			);

			let cantProdStock;
			if (prodStock) {
				cantProdStock = prodStock.cantidad;
			} else {
				res.json({
					msg: `El producto ${element.ProductoCodigo} o su punto de stock no se encuentran en la base de datos`,
					severity: 'error',
				});
				return;
			}

			const cantfinal = cantProdStock - cantProdCarr;

			// comparar cantidades con los productos del carrito para ver si estan disponibles
			if (cantfinal < 0) {
				prodsSinStock.push(element.ProductoCodigo);
			} else {
				cantsFinales.push({
					ProductoCodigo: element.ProductoCodigo,
					cantFinal: cantfinal,
					PtoStockId: element.PtoStockId,
				});
			}
		}
	}

	if (prodsSinStock.length > 0) {
		// borrarlo del detalle de la orden
		for (let j = 0; j < prodsSinStock.length; j++) {
			const element = prodsSinStock[j];
			detalleOrden = detalleOrden.filter((x) => x.ProductoCodigo !== element);
		}
	}

	// rollback
	const t = await sequelize.transaction();
	try {
		// debe hacer los movimientos de stock
		// si todo va bien hacer un ciclo for con un update para cada producto
		for (let i = 0; i < cantsFinales.length; i++) {
			const element = cantsFinales[i];

			await Stock.update(
				{ cantidad: element.cantFinal },
				{
					transaction: t,
					where: {
						ProductoCodigo: element.ProductoCodigo,
						PtoStockId: element.PtoStockId,
					},
				}
			);
		}

		const orden = await Orden.create(
			{
				observaciones: req.body.observaciones,
				direccionEnvio: req.body.direccionEnvio,
				tarifaEnvio: req.body.tarifaEnvio,
				ordenEcommerce: req.body.ordenEcommerce,
				ClienteId: req.body.ClienteId,
				PtoVentaId: req.body.PtoVentaId,
				UsuarioId: req.usuarioId,
				OrdenEstadoId: req.body.OrdenEstadoId,
				TipoEnvioId: req.body.TipoEnvioId,
				detalleOrden: detalleOrden,
			},
			{
				include: 'detalleOrden',
				transaction: t,
			}
		);

		// crear los movimientos de stock
		for (let k = 0; k < detalleOrden.length; k++) {
			const element = detalleOrden[k];
			const cantProdCarr = element.cantidad;
			const cod = element.ProductoCodigo;
			const ptoStockId = element.PtoStockId;

			if (ptoStockId !== null) {
				await MovimientoStock.create(
					{
						cantidad: cantProdCarr,
						motivo: 'venta',
						ProductoCodigo: cod,
						PtoStockId: ptoStockId,
						UsuarioId: req.usuarioId,
					},
					{
						transaction: t,
					}
				);
			}
		}

		await t.commit();
		if (prodsSinStock.length > 0) {
			res.json({
				orden: orden,
				msg: `Los productos ${prodsSinStock.map(
					(x) => `${x} `
				)}fueron eliminados del carrito por no contar con unidades suficientes`,
				severity: 'warning',
			});
		} else {
			res.json(orden);
		}
	} catch (error) {
		await t.rollback();
		res.json({ error: 'Hubo un error' });
	}
};

// traer stock total y precios
exports.traerOrdenes = async (req, res) => {
	try {
		const ordenes = await Orden.findAll({
			attributes: {
				exclude: [
					'ClienteId',
					'UsuarioId',
					'TipoEnvioId',
					'PtoVentaId',
					'OrdenEstadoId',
				],
			},
			include: [
				{
					model: Factura,
					attributes: {
						exclude: ['OrdenId', 'UsuarioId', 'tipo', 'estado', 'ClienteId'],
					},
					include: [
						{
							model: Cliente,
							attributes: { exclude: ['EmpresaId', 'createdAt', 'updatedAt'] },
						},
						{
							model: FacturaDetalle,
							as: 'detalleFactura',
							attributes: { exclude: ['FacturaId'] },
							include: [
								{
									model: Producto,
									attributes: ['descripcion'],
								},
							],
						},
						{
							model: Pago,
							attributes: {
								exclude: ['FacturaId', 'UsuarioId', 'MetodoPagoId'],
							},
							include: { model: MetodoPago, attributes: ['id', 'descripcion'] },
						},
					],
				},
				{
					model: Cliente,
					attributes: { exclude: ['EmpresaId', 'createdAt', 'updatedAt'] },
					include: { model: Direccion, as: 'direcciones' },
				},
				{
					model: Usuario,
					attributes: ['usuario'],
				},
				{
					model: OrdenDetalle,
					as: 'detalleOrden',
					attributes: {
						exclude: ['OrdenId', 'PtoStockId'],
					},
					include: [
						{ model: PtoStock, attributes: ['id', 'descripcion'] },
						{
							model: Producto,
							attributes: ['descripcion'],
						},
					],
				},
				{
					model: TipoEnvio,
					attributes: ['id', 'descripcion'],
				},
				{
					model: PtoVenta,
					as: 'PtoVenta',
					attributes: ['id', 'descripcion'],
				},
				{
					model: OrdenEstado,
					attributes: ['id', 'descripcion'],
				},
			],
			where: { OrdenEstadoId: { [Op.not]: [5, 6] } },
		});
		res.status(200).json(ordenes);
	} catch (error) {
		res.json(error);
	}
};

exports.traerOrden = async (req, res) => {
	try {
		const ordenes = await Orden.findOne({
			attributes: { exclude: ['ClienteId', 'UsuarioId'] },
			include: [
				{
					model: Factura,
					attributes: {
						exclude: ['OrdenId', 'UsuarioId', 'tipo', 'estado', 'ClienteId'],
					},
					include: [
						{
							model: Cliente,
							attributes: { exclude: ['EmpresaId', 'createdAt', 'updatedAt'] },
						},
						{
							model: FacturaDetalle,
							as: 'detalleFactura',
							attributes: { exclude: ['FacturaId'] },
						},
						{
							model: Pago,
							attributes: {
								exclude: ['FacturaId', 'UsuarioId', 'MetodoPagoId'],
							},
							include: { model: MetodoPago, attributes: ['id', 'descripcion'] },
						},
					],
				},
				{
					model: Cliente,
					attributes: { exclude: ['EmpresaId', 'createdAt', 'updatedAt'] },
				},
				{
					model: Usuario,
					attributes: ['usuario'],
				},
				{
					model: OrdenDetalle,
					as: 'detalleOrden',
					attributes: {
						exclude: ['OrdenId', 'PtoStockId'],
					},
					include: { model: PtoStock, attributes: ['id', 'descripcion'] },
				},
			],
			where: { id: req.params.Id },
		});
		res.status(200).json(ordenes);
	} catch (error) {
		res.json(error);
	}
};

exports.traerOrdenesCliente = async (req, res) => {
	try {
		const ordenes = await Orden.findAll({
			attributes: {
				exclude: [
					'ClienteId',
					'UsuarioId',
					'TipoEnvioId',
					'OrdenEstadoId',
					'PtoVentaId',
				],
			},
			include: [
				{
					model: Factura,
					attributes: ['id'],
				},
				{
					model: Usuario,
					attributes: ['usuario'],
				},
				{
					model: PtoVenta,
					as: 'PtoVenta',
					attributes: ['id', 'descripcion'],
				},
				{
					model: TipoEnvio,
					attributes: ['id', 'descripcion'],
				},
				{
					model: OrdenEstado,
					attributes: ['id', 'descripcion'],
				},
				{
					model: OrdenDetalle,
					as: 'detalleOrden',
					attributes: {
						exclude: ['OrdenId', 'PtoStockId'],
					},
					include: { model: PtoStock, attributes: ['id', 'descripcion'] },
				},
			],
			where: { ClienteId: req.params.IdCliente },
		});
		res.status(200).json(ordenes);
	} catch (error) {
		res.json(error);
	}
};

exports.modificarOrden = async (req, res) => {
	// puedo modificar observaciones, ptoVenta, tipoEnvio y direccion sin restricciones
	// puedo modifiar envio si no hay factura vigente
	console.log(req.body.OrdenEstadoId);
	if (req.body.tarifaEnvio) {
		try {
			const facturasOrden = await Orden.findOne({
				attributes: [],
				include: {
					model: Factura,
					attributes: ['id', 'estado'],
					where: { estado: 'v' },
				},
				where: { id: req.params.Id },
			});

			if (facturasOrden) {
				res.json({
					msg: 'El costo de envío no puede ser modificado porque la orden tiene una factura vigente',
					severity: 'warning',
				});
				return;
			} else {
				try {
					await Orden.update(
						{
							observaciones: req.body.observaciones,
							direccionEnvio: req.body.direccionEnvio,
							tipoEnvioId: req.body.tipoEnvioId,
							PtoVentaId: req.body.PtoVentaId,
							tarifaEnvio: req.body.tarifaEnvio,
							OrdenEstadoId: req.body.OrdenEstadoId,
						},
						{
							where: {
								id: req.params.Id,
							},
						}
					);

					// res.json({ modificacion });
					res
						.status(200)
						.send({ msg: 'La orden ha sido modificada!', severity: 'success' });
				} catch (error) {
					res.json(error);
				}
			}
		} catch (error) {
			res.json(error);
		}
	} else {
		try {
			await Orden.update(
				{
					observaciones: req.body.observaciones,
					direccionEnvio: req.body.direccionEnvio,
					tipoEnvioId: req.body.tipoEnvioId,
					PtoVentaId: req.body.PtoVentaId,
					OrdenEstadoId: req.body.OrdenEstadoId,
				},
				{
					where: {
						id: req.params.Id,
					},
				}
			);

			res
				.status(200)
				.send({ msg: 'La orden ha sido modificada!', severity: 'success' });
		} catch (error) {
			res.status(400).send({ msg: 'Hubo un error!', severity: 'error' });
		}
	}
};

exports.eliminarOrden = async (req, res) => {
	try {
		const facturasOrden = await Orden.findOne({
			attributes: [],
			include: {
				model: Factura,
				attributes: ['id', 'estado'],
				where: { estado: 'v' },
			},
			where: { id: req.params.Id },
		});

		if (facturasOrden) {
			res.json({
				msg: 'La orden no puede ser eliminada porque tiene una factura vigente',
				severity: 'error',
			});
			return;
		} else {
			try {
				await Orden.destroy({
					where: {
						id: req.params.Id,
					},
				});

				res
					.status(200)
					.send({ msg: 'La orden ha sido eliminada!', severity: 'success' });
			} catch (error) {
				res.json(error);
				res.status(200).send({ msg: 'Hubo un error!', severity: 'error' });
			}
		}
	} catch (error) {
		res.status(200).send({ msg: 'Hubo un error!', severity: 'error' });
	}
};
