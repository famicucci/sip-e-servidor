const { Producto, PtoStock, Empresa } = require('../models/index');
const { sequelize } = require('../models/index');
const { QueryTypes } = require('sequelize');

exports.traerProductos = async (req, res) => {
	try {
		const productos = await Producto.findAll({
			attributes: ['codigo', 'descripcion'],
			where: { EmpresaId: req.usuarioEmpresaId },
		});
		res.json(productos);
	} catch (error) {
		res.json(error);
	}
};

exports.crearProducto = async (req, res) => {
	// consultar en bd los puntos de stock de la empresa
	const ptosStock = await PtoStock.findAll(
		{
			attributes: ['id'],
			include: [
				{
					model: Empresa,
					attributes: [],
					where: { id: req.usuarioEmpresaId },
				},
			],
		},
		{}
	);

	let stockIniciales = [];
	ptosStock.forEach((ptoStock) => {
		const stockInicial = {
			cantidad: 0,
			PtoStockId: ptoStock.id,
			ProductoCodigo: req.body.codigo,
		};
		stockIniciales.push(stockInicial);
	});

	// rollback
	const t = await sequelize.transaction();

	try {
		const producto = await Producto.create(
			{
				codigo: req.body.codigo,
				descripcion: req.body.descripcion,
				EmpresaId: req.usuarioEmpresaId,
				stockProducto: stockIniciales,
			},
			{
				include: 'stockProducto',
				transaction: t,
			}
		);
		await t.commit();
		res.json(producto);
	} catch (error) {
		await t.rollback();
		res.json(error);
		// res.json({ error: 'Un error ha ocurrido' });
	}
};

exports.modificarProducto = async (req, res) => {
	try {
		const producto = await Producto.update(
			{
				codigo: req.body.codigo,
				descripcion: req.body.descripcion,
			},
			{
				where: { codigo: req.params.ProductoCodigo },
			}
		);

		// verifica si el update fue exitoso
		if (producto[0]) {
			res.json({ success: 'El producto ha sido modificado' });
		} else {
			res.json({ error: 'No se produjo ningún cambio en la base de datos' });
		}
	} catch (error) {
		res.json({ error: 'Ocurrió un error' });
	}
};

// eliminar
exports.eliminarProducto = async (req, res) => {
	try {
		const producto = await Producto.destroy({
			where: { codigo: req.params.ProductoCodigo },
		});

		if (producto) {
			res.json({ success: 'Producto eliminado' });
		} else {
			res.json({ error: 'No se produjo ningún cambio en la base de datos' });
		}
	} catch (error) {
		res.json(error);
	}
};

exports.traerProductosAMover = async (req, res) => {
	try {
		// const id = 2;
		const productos = await sequelize.query(
			`SELECT OrdenDetalle.ProductoCodigo, producto.Descripcion, OrdenDetalle.Cantidad, OrdenDetalle.PtoStockId AS ID_Pto_Stock_Producto , pto_stock_producto.Descripcion AS Pto_Stock_Producto_Descripcion, PtoVenta.PtoStockId AS ID_Pto_Stock_De_Pto_Venta, pto_stock_pto_venta.Descripcion AS Pto_Stock_Pto_Venta_Descripcion
			FROM OrdenDetalle 
			INNER JOIN producto ON OrdenDetalle.ProductoCodigo = producto.Codigo
			INNER JOIN Orden ON OrdenDetalle.OrdenId = Orden.ID
			INNER JOIN PtoVenta ON Orden.PtoVentaId = PtoVenta.ID
			INNER JOIN PtoStock AS pto_stock_producto ON OrdenDetalle.PtoStockId = pto_stock_producto.ID
			INNER JOIN PtoStock AS pto_stock_pto_venta ON PtoVenta.PtoStockId = pto_stock_pto_venta.ID
			WHERE OrdenDetalle.Origen = 'PtoStock'
			AND (Orden.OrdenEstadoId != '11')
			AND OrdenDetalle.PtoStockId != PtoVenta.PtoStockId
			AND producto.EmpresaId = '1'`,
			{
				type: QueryTypes.SELECT,
			}
		);

		res.json(productos);
	} catch (error) {
		res.json(error);
	}
};
