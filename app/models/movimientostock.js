'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class MovimientoStock extends Model {
		static associate(models) {
			MovimientoStock.belongsTo(models.Producto, {
				foreignKey: { name: 'ProductoCodigo', allowNull: false },
				targetKey: 'codigo',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
			MovimientoStock.belongsTo(models.PtoStock, {
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
			MovimientoStock.belongsTo(models.Usuario, {
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
		}
	}
	MovimientoStock.init(
		{
			cantidad: { type: DataTypes.INTEGER, allowNull: false },
			motivo: DataTypes.STRING(30),
		},
		{
			sequelize,
			modelName: 'MovimientoStock',
			updatedAt: false,
		}
	);
	return MovimientoStock;
};
