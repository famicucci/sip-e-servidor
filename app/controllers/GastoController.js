const {
	Gasto,
	GastoCategoria,
	GastoSubcategoria,
	Usuario,
} = require('../models/index');

exports.crearGasto = async (req, res) => {
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

exports.modificarGasto = async (req, res) => {
	console.log(req.body);
	try {
		const gasto = await Gasto.update(
			{
				descripcion: req.body.descripcion,
				estado: req.body.estado,
				importe: req.body.importe,
				UsuarioId: req.usuarioId,
				GastoCategoriaId: req.body.GastoCategoriaId,
				GastoSubcategoriaId: req.body.GastoSubcategoriaId,
			},
			{
				where: { id: req.params.Id },
			}
		);

		// verifica si el update fue exitoso
		if (gasto[0]) {
			res
				.status(200)
				.send({ msg: 'El gasto ha sido modificado!', severity: 'success' });
		} else {
			res
				.status(400)
				.send({ error: 'No se produjo ningún cambio en la base de datos' });
		}
	} catch (error) {
		res.json(error);
	}
};

exports.traerGastos = async (req, res) => {
	try {
		const gastos = await Gasto.findAll({
			attributes: [
				'id',
				'descripcion',
				'estado',
				'importe',
				'createdAt',
				'updatedAt',
				'UsuarioId',
			],
			include: [
				{
					model: GastoCategoria,
					as: 'GastoCategoria',
					attributes: ['id'],
				},
				{
					model: GastoSubcategoria,
					as: 'GastoSubcategoria',
					attributes: ['id'],
				},
				{
					model: Usuario,
					attributes: ['usuario'],
					where: { EmpresaId: req.usuarioEmpresaId },
				},
			],

			raw: true,
		});
		res.json(gastos);
	} catch (error) {
		res.json(error);
	}
};

exports.traerCategorias = async (req, res) => {
	try {
		const categorias = await GastoCategoria.findAll({
			where: { EmpresaId: req.usuarioEmpresaId },
			attributes: { exclude: ['EmpresaId'] },
		});
		res.json(categorias);
	} catch (error) {
		res.json(error);
	}
};

exports.traerSubcategorias = async (req, res) => {
	try {
		const categorias = await GastoSubcategoria.findAll({
			attributes: { exclude: ['GastoCategoriaId'] },
			include: [
				{
					attributes: [],
					model: GastoCategoria,
					where: { EmpresaId: req.usuarioEmpresaId },
				},
			],
		});
		res.json(categorias);
	} catch (error) {
		res.json(error);
	}
};

exports.eliminarGasto = async (req, res) => {
	try {
		const gasto = await Gasto.destroy({
			where: { id: req.params.Id },
		});

		if (gasto) {
			res
				.status(200)
				.send({ msg: 'El gasto ha sido eliminado!', severity: 'success' });
		} else {
			res.status(400).send({
				msg: 'No se produjo ningún cambio en la base de datos',
				severity: 'error',
			});
		}
	} catch (error) {
		res.json(error);
	}
};
