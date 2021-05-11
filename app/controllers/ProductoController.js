const { Producto, Empresa } = require('../models/index');

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
	try {
		const producto = await Producto.create({
			codigo: req.body.codigo,
			descripcion: req.body.descripcion,
			EmpresaId: req.body.EmpresaId,
		});
		res.json(producto);
	} catch (error) {
		console.log(req.body);
		res.json(error);
	}
};

// modificar

// eliminar
