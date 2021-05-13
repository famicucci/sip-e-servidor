'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Stock extends Model {
		static associate(models) {
			Stock.belongsTo(models.PtoStock);
			Stock.belongsTo(models.Producto, {
				foreignKey: 'ProductoCodigo',
			});
		}
	}
	Stock.init(
		{
			cantidad: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Stock',
			createdAt: false,
		}
	);
	return Stock;
};
