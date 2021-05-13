'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Stock extends Model {
		static associate(models) {
			Stock.belongsTo(models.PtoStock);
			Stock.belongsTo(models.Producto);
		}
	}
	Stock.init(
		{
			cantidad: DataTypes.INTEGER,
			PtoStockId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Stock',
			createdAt: false,
		}
	);
	return Stock;
};
