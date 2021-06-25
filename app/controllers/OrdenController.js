const { Orden, Stock, MovimientoStock } = require('../models/index');
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
	for (let k = 0; k < detalleOrden.length; k++) {
		const element = detalleOrden[k];
		const cantProdCarr = element.cantidad;
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
					attributes: {
						exclude: ['OrdenId', 'PtoStockId'],
					},
					include: { model: PtoStock, attributes: ['id', 'descripcion'] },
				},
			],
			where: { OrdenEstadoId: { [Op.not]: [5, 6] } },
		});
		res.status(200).json(ordenes);
	} catch (error) {
		res.json(error);
	}
};
