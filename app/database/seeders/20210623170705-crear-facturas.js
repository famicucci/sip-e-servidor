'use strict';
const moment = require('moment');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let facturas = [
			{
				observaciones: 'Observación de prueba',
				estadoPago: 'Pendiente',
				importe: 4567,
				descuento: 789,
				tarifaEnvio: 654,
				importeFinal: 5500,
				tipo: 'f',
				estado: 'v',
				createdAt: moment().format(),
				OrdenId: 1,
				UsuarioId: 1,
			},
			{
				observaciones: 'Otra observación de prueba',
				estadoPago: 'Pago',
				importe: 9876,
				importeFinal: 9876,
				tipo: 'f',
				estado: 'v',
				createdAt: moment().format(),
				OrdenId: 2,
				UsuarioId: 2,
			},
			{
				observaciones: 'Factura anulada por error del cliente',
				estadoPago: 'Cancelado',
				importe: 11000,
				importeFinal: 11000,
				tipo: 'nc',
				estado: 'c',
				createdAt: moment().format(),
				UsuarioId: 1,
			},
			{
				observaciones: 'Nota de credito que anula factura, error de cliente',
				importe: 11000,
				importeFinal: 11000,
				tipo: 'nc',
				estado: 'v',
				createdAt: moment().format(),
				UsuarioId: 2,
			},
		];
		await queryInterface.bulkInsert('factura', facturas, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('factura', null, {});
	},
};
