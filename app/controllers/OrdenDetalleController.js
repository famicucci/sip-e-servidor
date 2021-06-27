const {
	OrdenDetalle,
	Stock,
	MovimientoStock,
	Orden,
	Factura,
} = require('../models/index');
const { sequelize } = require('../models/index');

// traer stock total y precios
exports.modificarDetalleOrden = async (req, res) => {
	const t = await sequelize.transaction();
	try {
		const facturasOrden = await Orden.findOne({
			attributes: [],
			include: {
				model: Factura,
				attributes: ['id', 'estado'],
				where: { estado: 'v' },
			},
			where: { id: req.params.OrdenId },
		});

		if (facturasOrden) {
			await t.rollback();
			res.json({
				msg: 'El detalle de la orden no puede ser modificado porque la orden tiene una factura vigente',
				severity: 'warning',
			});
			return;
		}

		// trae el detalle actual
		const detalleActual = await OrdenDetalle.findAll({
			where: { OrdenId: req.params.OrdenId },
			raw: true,
		});

		// borrar el detalle actual
		await OrdenDetalle.destroy({
			where: { OrdenId: req.params.OrdenId },
			transaction: t,
		});

		// incrementa el stock según detalle actual
		for (let i = 0; i < detalleActual.length; i++) {
			const element = detalleActual[i];

			await Stock.increment(
				{ cantidad: element.cantidad },
				{
					transaction: t,
					where: {
						ProductoCodigo: element.ProductoCodigo,
						PtoStockId: element.PtoStockId,
					},
				}
			);
		}

		// verificar que los productos tengan stock
		// traer todos los stocks de productos
		const stocks = await Stock.findAll({
			attributes: { exclude: ['updatedAt'] },
		});

		let prodsSinStock = [];
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
				await t.rollback();
				res.json({
					msg: `El producto ${element.ProductoCodigo} o su punto de stock no se encuentran en la base de datos`,
					severity: 'error',
				});
				return;
			}

			// si el producto ya esta en el carrito tengo que sumar al stock las cantidades de detalleActual
			const prodDetalleActual = detalleActual.find(
				(x) =>
					x.ProductoCodigo === element.ProductoCodigo &&
					x.PtoStockId === element.PtoStockId
			);

			if (prodDetalleActual) {
				cantProdStock = cantProdStock + prodDetalleActual.cantidad;
			}
			const cantfinal = cantProdStock - cantProdCarr;

			if (cantfinal < 0) {
				prodsSinStock.push(element.ProductoCodigo);
			}
		}

		// si hay productos en el detalle modificado que no tienen stock, los elimina de dicho detalle
		if (prodsSinStock.length > 0) {
			for (let j = 0; j < prodsSinStock.length; j++) {
				const element = prodsSinStock[j];
				detalleOrden = detalleOrden.filter((x) => x.ProductoCodigo !== element);
			}
		}

		for (let i = 0; i < detalleOrden.length; i++) {
			const element = detalleOrden[i];

			await Stock.decrement(
				{ cantidad: element.cantidad },
				{
					transaction: t,
					where: {
						ProductoCodigo: element.ProductoCodigo,
						PtoStockId: element.PtoStockId,
					},
				}
			);
		}

		// debe crear el los registros con el OrdenId que viene en el params
		detalleOrden = detalleOrden.map((x) => ({
			...x,
			OrdenId: req.params.OrdenId,
		}));

		// crea el nuevo detalle
		await OrdenDetalle.bulkCreate(detalleOrden, {
			transaction: t,
		});

		// crea los movimientos de stock
		const detalleOrdenMod = detalleOrden.map((x) => ({
			...x,
			cantidad: -x.cantidad,
		}));

		// concateno los dos array
		let mergeArray = detalleActual.concat(detalleOrdenMod);

		// elimino atributos innecesarios, para luego poder eliminar duplicados
		mergeArray = mergeArray.map((x) => ({
			cantidad: x.cantidad,
			ProductoCodigo: x.ProductoCodigo,
			PtoStockId: x.PtoStockId,
		}));

		let nuevoArray = [];
		for (let i = 0; i < mergeArray.length; i++) {
			const element = mergeArray[i];
			const ProductoCodigo = element.ProductoCodigo;
			const PtoStockId = element.PtoStockId;

			let r = mergeArray.filter(
				(x) =>
					x.ProductoCodigo === ProductoCodigo && x.PtoStockId === PtoStockId
			);

			const cants = r.map((x) => x.cantidad);
			const suma = cants.reduce((acc, el) => acc + el, 0);

			r = r.map((x) => ({ ...x, cantidad: suma }));

			nuevoArray.push(r);
		}

		nuevoArray = nuevoArray.flat();

		let set = new Set(nuevoArray.map(JSON.stringify));
		let arrayMovStock = Array.from(set).map(JSON.parse);

		// si hay productos sin stock los saco del array movimientos
		if (prodsSinStock.length > 0) {
			for (let j = 0; j < prodsSinStock.length; j++) {
				const element = prodsSinStock[j];
				arrayMovStock = arrayMovStock.filter(
					(x) => x.ProductoCodigo !== element
				);
			}
		}

		// crear los movimientos de stock según el detalle modificado
		for (let k = 0; k < arrayMovStock.length; k++) {
			const element = arrayMovStock[k];
			const cant = element.cantidad;
			const cod = element.ProductoCodigo;
			const ptoStockId = element.PtoStockId;

			if (cant !== 0) {
				await MovimientoStock.create(
					{
						cantidad: cant,
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

		// solucionar el registro de movimientos de stock (ahora solo registra los del detalle modificado)
		await t.commit();

		if (prodsSinStock.length > 0) {
			res.json({
				detalleOrden: detalleOrden,
				msg: `Hubo un error con los productos ${prodsSinStock.map(
					(x) => `${x} `
				)}, fueron eliminados del carrito por no contar con unidades suficientes`,
				severity: 'warning',
			});
		} else {
			res.json({ detalleOrden });
		}
	} catch (error) {
		await t.rollback();
		res.json(error);
	}
};
