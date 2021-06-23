const { Gasto, GastoCategoria, GastoSubcategoria } = require('../models/index');

exports.crearGasto = async (req, res) => {
	console.log(req.body);
	try {
		const gasto = await Gasto.create({
			descripcion: req.body.descripcion,
			estado: req.body.estado,
			importe: req.body.importe,
			UsuarioId: req.usuarioId,
			GastoCategoriaId: req.body.GastoCategoriaId,
			GastoSubcategoriaId: req.body.GastoSubcategoriaId,
		});
		res.json(gasto);
	} catch (error) {
		res.json(error);
	}
};

exports.traerCatSubcat = async (req, res) => {
	try {
		const categorias = await GastoCategoria.findAll({
			where: { EmpresaId: req.usuarioEmpresaId },
			include: [
				{
					attributes: ['id', 'descripcion'],
					model: GastoSubcategoria,
				},
			],
		});
		res.json(categorias);
	} catch (error) {
		res.json(error);
	}
};
