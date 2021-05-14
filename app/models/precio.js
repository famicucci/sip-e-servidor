'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Precio extends Model {
		static associate(models) {
			Precio.belongsTo(models.ListaPrecio);
			Precio.belongsTo(models.Producto, {
				foreignKey: 'ProductoCodigo',
				targetKey: 'codigo',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
		}
	}
	Precio.init(
		{
			pu: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
			ListaPrecioId: { type: DataTypes.INTEGER, allowNull: false },
		},
		{
			sequelize,
			modelName: 'Precio',
		}
	);
	return Precio;
};
