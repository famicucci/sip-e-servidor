'use strict';
const moment = require('moment');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let movimientos = [];
		await queryInterface.bulkInsert('movimientostock', movimientos, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('movimientostock', null, {});
	},
};
