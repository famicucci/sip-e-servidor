'use strict';
const moment = require('moment');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let ptosStocks = [
			{
				descripcion: 'Showroom',
				EmpresaId: 1,
				createdAt: moment().format(),
			},
			{
				descripcion: 'Depósito',
				EmpresaId: 1,
				createdAt: moment().format(),
			},
			{
				descripcion: 'Outlet',
				EmpresaId: 1,
				createdAt: moment().format(),
			},
			{
				descripcion: 'Mercado Libre',
				EmpresaId: 1,
				createdAt: moment().format(),
			},
		];
		await queryInterface.bulkInsert('ptostocks', ptosStocks, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('ptostocks', null, {});
	},
};
