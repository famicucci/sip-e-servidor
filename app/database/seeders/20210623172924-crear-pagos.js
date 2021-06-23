'use strict';
const moment = require('moment');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let pagos = [
			{
				importe: 5500,
				createdAt: moment().format(),
				FacturaId: 1,
				MetodoPagoId: 1,
			},
			{
				importe: 7876,
				createdAt: moment().format(),
				FacturaId: 2,
				MetodoPagoId: 2,
			},
			{
				importe: 2000,
				createdAt: moment().format(),
				FacturaId: 2,
				MetodoPagoId: 1,
			},
		];
		await queryInterface.bulkInsert('pago', pagos, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('pago', null, {});
	},
};
