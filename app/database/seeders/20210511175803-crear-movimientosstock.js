'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let movimientos = [
			{
				ProductoCodigo: 'PJ100027LM',
				cantidad: 2,
				PtoStockId: 1,
				UsuarioId: 3,
				motivo: 'movimiento',
			},
			{
				ProductoCodigo: 'RA100031LM',
				cantidad: -1,
				PtoStockId: 1,
				UsuarioId: 3,
				motivo: 'venta',
			},
			{
				ProductoCodigo: 'PJ100022LM',
				cantidad: -2,
				PtoStockId: 1,
				UsuarioId: 3,
				motivo: 'venta',
			},
			{
				ProductoCodigo: 'PJ100027LM',
				cantidad: 4,
				PtoStockId: 1,
				UsuarioId: 3,
				motivo: 'movimiento',
			},
			{
				ProductoCodigo: 'PJ100022LM',
				cantidad: 2,
				PtoStockId: 1,
				UsuarioId: 3,
				motivo: 'movimiento',
			},
			{
				ProductoCodigo: 'RA100031LM',
				cantidad: -1,
				PtoStockId: 1,
				UsuarioId: 3,
				motivo: 'venta',
			},
			{
				ProductoCodigo: 'PJ100022LM',
				cantidad: -1,
				PtoStockId: 1,
				UsuarioId: 3,
				motivo: 'venta',
			},
			{
				ProductoCodigo: 'RA100031LM',
				cantidad: 2,
				PtoStockId: 1,
				UsuarioId: 3,
				motivo: 'movimiento',
			},
		];
		await queryInterface.bulkInsert('movimientostocks', movimientos, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('movimientostocks', null, {});
	},
};
