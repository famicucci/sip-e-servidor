const { Precio, Producto } = require('../models/index');

exports.crearPrecio = async (req, res) => {
	try {
		const precio = await Precio.create({
			ProductoCodigo: req.body.ProductoCodigo,
			ListaPrecioId: req.body.ListaPrecioId,
			pu: req.body.pu,
		});
		res.json(precio);
	} catch (error) {
		res.json(error);
	}
};

exports.modificarPrecio = async (req, res) => {
	try {
		const precio = await Precio.update(
			{
				pu: req.body.pu,
			},
			{
				where: {
					ProductoCodigo: req.body.ProductoCodigo,
					ListaPrecioId: req.body.ListaPrecioId,
				},
			}
		);

		// verifica si el update fue exitoso
		if (precio[0]) {
			res.json({ success: 'Precio Modificado' });
		} else {
			res.json({ error: 'No se produjo ningún cambio en la base de datos' });
		}
	} catch (error) {
		res.json({ error: 'Ocurrió un error' });
	}
};

// traer stock por punto de stock
exports.traerPrecios = async (req, res) => {
	try {
		const stocks = await Precio.findAll({
			include: {
				model: Producto,
				attributes: ['descripcion'],
				where: { EmpresaId: req.usuarioEmpresaId },
			},
		});
		res.json(stocks);
	} catch (error) {
		res.json({ error });
	}
};
