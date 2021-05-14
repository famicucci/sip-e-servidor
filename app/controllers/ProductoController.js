const { Producto, PtoStock, Empresa } = require('../models/index');
const { sequelize } = require('../models/index');

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
		res.json({ error: 'Un error ha ocurrido' });
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
		res.json({ success: 'El producto ha sido modificado' });
	} catch (error) {
		res.json(error);
	}
};

// eliminar
exports.eliminarProducto = async (req, res) => {
	try {
		const producto = await Producto.destroy({
			where: { codigo: req.params.ProductoCodigo },
		});
		res.json({ success: 'El producto ha sido eliminado' });
	} catch (error) {
		res.json(error);
	}
};
