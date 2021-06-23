const {
	Stock,
	PtoStock,
	PtoVenta,
	Producto,
	Precio,
	TipoEnvio,
	Cliente,
} = require('../models/index');

exports.crearCliente = async (req, res) => {
	try {
		const cliente = await Cliente.create({
			nombre: req.body.nombre,
			apellido: req.body.apellido,
			observaciones: req.body.observaciones,
			instagram: req.body.instagram,
			facebook: req.body.facebook,
			celular: req.body.celular,
			email: req.body.email,
			mascota: req.body.mascota,
			tipo: req.body.tipo,
			dni: req.body.dni,
			razonSocial: req.body.razonSocial,
			condIva: req.body.condIva,
			EmpresaId: req.usuarioEmpresaId,
		});
		res.status(200).json(cliente);
	} catch (error) {
		res.json(error);
	}
};

exports.modificarCliente = async (req, res) => {
	try {
		const cliente = await Cliente.update(
			{
				nombre: req.body.nombre,
				apellido: req.body.apellido,
				observaciones: req.body.observaciones,
				instagram: req.body.instagram,
				facebook: req.body.facebook,
				celular: req.body.celular,
				email: req.body.email,
				mascota: req.body.mascota,
				tipo: req.body.tipo,
				dni: req.body.dni,
				razonSocial: req.body.razonSocial,
				condIva: req.body.condIva,
			},
			{ where: { id: req.params.Id, EmpresaId: req.usuarioEmpresaId } }
		);

		// verifica si el update fue exitoso
		if (cliente[0]) {
			res
				.status(200)
				.send({ msg: 'El cliente ha sido modificado!', severity: 'success' });
		} else {
			res
				.status(400)
				.send({ error: 'No se produjo ningún cambio en la base de datos' });
		}
	} catch (error) {
		res.json(error);
	}
};

exports.traerClientes = async (req, res) => {
	try {
		const clientes = await Cliente.findAll({
			attributes: [
				'id',
				'nombre',
				'apellido',
				'observaciones',
				'instagram',
				'facebook',
				'celular',
				'email',
				'mascota',
				'tipo',
				'dni',
				'razonSocial',
				'condIva',
				'createdAt',
				'updatedAt',
			],
		});

		res.json(clientes);
	} catch (error) {
		res.json(error);
	}
};

exports.eliminarCliente = async (req, res) => {
	try {
		const cliente = await Cliente.destroy({
			where: { id: req.params.Id, EmpresaId: req.usuarioEmpresaId },
		});

		// verifica si el update fue exitoso
		if (cliente) {
			res
				.status(200)
				.send({ msg: 'El cliente ha sido eliminado!', severity: 'success' });
		} else {
			res
				.status(400)
				.send({ error: 'No se produjo ningún cambio en la base de datos' });
		}
	} catch (error) {
		res.json(error);
	}
};
