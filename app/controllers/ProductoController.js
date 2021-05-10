const { Producto } = require('../database/db');

exports.traerProductos = async (req, res) => {
	try {
		const productos = await Producto.findAll();
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
		});
		res.json(producto);
	} catch (error) {
		res.json(error);
	}
};