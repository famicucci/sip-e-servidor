'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Stock extends Model {
		static associate(models) {
			Stock.belongsTo(models.PtoStock);
		}
	}
	Stock.init(
		{
			codigoProd: DataTypes.STRING,
			cantidad: DataTypes.INTEGER,
			PtoStockId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Stock',
		}
	);
	return Stock;
};
