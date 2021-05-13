const { Producto } = require('../models/index');

exports.traerProductos = async (req, res) => {
	try {
		const productos = await Producto.findAll({
			attributes: ['codigo', 'descripcion'],
		});
		res.json(productos);
	} catch (error) {
		res.json(error);
	}
};

exports.crearProducto = async (req, res) => {
	// consultar en bd cuantos los puntos de stock de la empresa
	// const ptosStock = [1, 4];
	// let stockIniciales = [];
	// ptosStock.forEach(ptoStock => {
	// 	const stockInicial = {cantidad: 0, PtoStockId: ptoStock, ProductoId: req.body.codigo}

	// });
	try {
		const producto = await Producto.create(
			{
				codigo: req.body.codigo,
				descripcion: req.body.descripcion,
				EmpresaId: req.body.EmpresaId,
				stockProducto: [
					{
						cantidad: 0,
						PtoStockId: req.body.PtoStockId,
						ProductoCodigo: req.body.codigo,
					},
					{
						cantidad: 0,
						PtoStockId: 2,
						ProductoCodigo: req.body.codigo,
					},
				],
			},
			{
				include: 'stockProducto',
			}
		);
		res.json(producto);
	} catch (error) {
		console.log(req.body);
		res.json(error);
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
