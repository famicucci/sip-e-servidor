const { Producto } = require('../database/db');

exports.traerProductos = async (req, res) => {
	const productos = await Producto.findAll();
	res.json(productos);
};
