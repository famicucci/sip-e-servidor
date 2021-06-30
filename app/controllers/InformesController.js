const { Pago, Gasto } = require('../models/index');
const { sequelize } = require('../models/index');
const { Op } = require('sequelize');
const moment = require('moment');

exports.traerIngresosBrutos = async (req, res) => {
	// desde debe tomar el dia ingresado a las 00:00:00
	// hasta debe tomar el dia ingresado a las 24:00:00
	const startDate = moment(req.body.startDate).subtract({
		hours: 3,
	});
	const endDate = moment(req.body.endDate).add({
		hours: 21,
	});
	try {
		const ingresosBrutos = await Pago.findAll({
			attributes: [[sequelize.fn('sum', sequelize.col('importe')), 'importe']],
			where: {
				createdAt: {
					[Op.between]: [startDate, endDate],
				},
			},
		});

		if (ingresosBrutos[0].importe) {
			res.status(200).json(ingresosBrutos[0].importe);
		} else {
			res.status(200).json('0');
		}
	} catch (error) {
		res.json(error);
	}
};

exports.traerGastos = async (req, res) => {
	const startDate = moment(req.body.startDate).subtract({
		hours: 3,
	});
	const endDate = moment(req.body.endDate).add({
		hours: 21,
	});

	let whereClausula = {
		createdAt: {
			[Op.between]: [startDate, endDate],
		},
	};

	if (req.body.IdCategoria) {
		whereClausula = {
			...whereClausula,
			GastoCategoriaId: req.body.IdCategoria,
		};
		if (req.body.IdSubcategoria) {
			whereClausula = {
				...whereClausula,
				GastoSubcategoriaId: req.body.IdSubcategoria,
			};
		}
	}

	try {
		const gastos = await Gasto.findAll({
			attributes: [[sequelize.fn('sum', sequelize.col('importe')), 'importe']],
			where: whereClausula,
		});

		if (gastos[0].importe) {
			res.status(200).json(gastos[0].importe);
		} else {
			res.status(200).json('0');
		}
	} catch (error) {
		res.json(error);
	}
};
