'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Stock extends Model {
		static associate(models) {
			Stock.belongsTo(models.PtoStock);
			Stock.belongsTo(models.Producto, {
				foreignKey: 'ProductoCodigo',
				// Targetkey?????
			});
		}
	}
	Stock.init(
		{
			cantidad: { type: DataTypes.INTEGER(11).UNSIGNED, allowNull: false },
		},
		{
			sequelize,
			modelName: 'Stock',
			createdAt: false,
		}
	);
	return Stock;
};
