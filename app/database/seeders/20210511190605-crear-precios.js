'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let precios = [
			{ ProductoCodigo: 'PJ100027LM', pu: '1850', ListaPrecioId: '1' },
			{ ProductoCodigo: 'PJ100022LM', pu: '1760', ListaPrecioId: '1' },
			{ ProductoCodigo: 'RA100031LM', pu: '1320', ListaPrecioId: '1' },
			{ ProductoCodigo: 'PJ100027LM', pu: '1350', ListaPrecioId: '2' },
			{ ProductoCodigo: 'PJ100022LM', pu: '1260', ListaPrecioId: '2' },
			{ ProductoCodigo: 'RA100031LM', pu: '870', ListaPrecioId: '2' },
		];
		await queryInterface.bulkInsert('precios', precios, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('precios', null, {});
	},
};
