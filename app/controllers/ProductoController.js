const { Producto } = require('../database/db');

exports.traerProductos = async (req, res) => {
	const productos = await Producto.findAll();
	res.json(productos);
};

exports.crearProducto = async (req, res) => {
	const producto = await Producto.create({
		codigo: req.body.codigo,
		descripcion: req.body.descripcion,
	});
	res.json(producto);
};
