'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Pago extends Model {
		static associate(models) {
			Pago.belongsTo(models.Factura, {
				foreignKey: { allowNull: false },
				onDelete: 'RESTRICT',
				onUpdate: 'RESTRICT',
			});
			Pago.belongsTo(models.MetodoPago, {
				foreignKey: { allowNull: false },
				onDelete: 'NO ACTION',
				onUpdate: 'NO ACTION',
			});
		}
	}
	Pago.init(
		{
			importe: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
		},
		{
			sequelize,
			modelName: 'Pago',
			updatedAt: false,
		}
	);
	return Pago;
};