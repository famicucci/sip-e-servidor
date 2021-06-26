const { OrdenDetalle, Stock, MovimientoStock } = require('../models/index');
const { sequelize } = require('../models/index');

// traer stock total y precios
exports.modificarDetalleOrden = async (req, res) => {
	// consultar el detalle
	const detalle = await OrdenDetalle.findAll({
		where: { OrdenId: req.params.OrdenId },
	});

	// borrar todo el detalle de la orden (productos)
	await OrdenDetalle.destroy({
		where: { OrdenId: req.params.OrdenId },
	});

	// // recuperar todo al stock
	for (let i = 0; i < detalle.length; i++) {
		const element = detalle[i];

		await Stock.increment(
			{ cantidad: element.cantidad },
			{
				// transaction: t,
				where: {
					ProductoCodigo: element.ProductoCodigo,
					PtoStockId: element.PtoStockId,
				},
			}
		);
	}

	res.json(detalle);
	return;

	// verificar que los productos tengan stock
	// traer todos los stocks de productos
	const stocks = await Stock.findAll({
		attributes: { exclude: ['updatedAt'] },
	});

	let prodsSinStock = [];
	let cantsFinales = [];
	let detalleOrden = req.body;
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

	// crear los productos en el detalle
	// crear los movimientos de stock correspondientes

	// aqui comienzan los creates
	// variables que necesito que me devuelva el control de stock: cantsFinales, detalleOrden
	const t = await sequelize.transaction();
	try {
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

		const ordenDetalle = await OrdenDetalle.bulkCreate(detalleOrden, {
			transaction: t,
		});

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
		res.status(200).json(ordenDetalle);
	} catch (error) {
		await t.rollback();
		res.json(error);
	}
};

// [{
//     "cantidad": 2,
//     "pu": 5642,
//     "origen": "PtoStock",
//     "OrdenId": 2,
//     "ProductoCodigo": "PJ100027LM",
//     "PtoStockId": 2
// },
// {
//     "cantidad": 2,
//     "pu": 5642,
//     "origen": "PtoStock",
//     "OrdenId": 2,
//     "ProductoCodigo": "PJ100022LM",
//     "PtoStockId": 2
// }]
