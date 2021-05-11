'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let stocks = [
			{ ProductoCodigo: 'PJ100027LM', cantidad: 22, PtoStockId: 1 },
			{ ProductoCodigo: 'PJ100022LM', cantidad: 11, PtoStockId: 1 },
			{ ProductoCodigo: 'RA100031LM', cantidad: 91, PtoStockId: 1 },
			{ ProductoCodigo: 'PJ100027LM', cantidad: 36, PtoStockId: 2 },
			{ ProductoCodigo: 'PJ100022LM', cantidad: 4, PtoStockId: 2 },
			{ ProductoCodigo: 'RA100031LM', cantidad: 10, PtoStockId: 2 },
			{ ProductoCodigo: 'PJ100027LM', cantidad: 17, PtoStockId: 3 },
			{ ProductoCodigo: 'PJ100022LM', cantidad: 3, PtoStockId: 3 },
			{ ProductoCodigo: 'RA100031LM', cantidad: 2, PtoStockId: 3 },
			{ ProductoCodigo: 'PJ100027LM', cantidad: 9, PtoStockId: 4 },
			{ ProductoCodigo: 'PJ100022LM', cantidad: 23, PtoStockId: 4 },
			{ ProductoCodigo: 'RA100031LM', cantidad: 55, PtoStockId: 4 },
		];
		await queryInterface.bulkInsert('stocks', stocks, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('stocks', null, {});
	},
};
