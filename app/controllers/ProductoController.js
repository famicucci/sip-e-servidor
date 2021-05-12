const { Producto, Empresa } = require('../models/index');

exports.traerProductos = async (req, res) => {
	console.log(req.usuarioId);
	console.log(req.usuarioRol);
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
	try {
		const producto = await Producto.create({
			codigo: req.body.codigo,
			descripcion: req.body.descripcion,
			EmpresaId: req.body.EmpresaId,
		});
		// crear registro en model: Stock (tiene que ser para todos los puntos de stock)
		// crear registro en model: Precio (tiene que ser para todas las listas de precio)
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
