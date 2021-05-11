'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let precios = [
			{ ProductoCodigo: 'PJ100027LM', pu: '1850', PrecioListaId: '1' },
			{ ProductoCodigo: 'PJ100022LM', pu: '1760', PrecioListaId: '1' },
			{ ProductoCodigo: 'RA100031LM', pu: '1320', PrecioListaId: '1' },
			{ ProductoCodigo: 'PJ100027LM', pu: '1350', PrecioListaId: '2' },
			{ ProductoCodigo: 'PJ100022LM', pu: '1260', PrecioListaId: '2' },
			{ ProductoCodigo: 'RA100031LM', pu: '870', PrecioListaId: '2' },
		];
		await queryInterface.bulkInsert('precios', precios, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('precios', null, {});
	},
};
