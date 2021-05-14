'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Producto extends Model {
		static associate(models) {
			Producto.belongsTo(models.Empresa);
			Producto.hasMany(models.Stock, {
				as: 'stockProducto',
				sourceKey: 'codigo',
				foreignKey: 'ProductoCodigo',
				allowNull: false,
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
			Producto.hasMany(models.Precio, {
				foreignKey: {
					name: 'ProductoCodigo',
					allowNull: false,
				},
				sourceKey: 'codigo',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
			Producto.hasMany(models.MovimientoStock, {
				as: 'movimientoStock',
				sourceKey: 'codigo',
				foreignKey: 'ProductoCodigo',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
		}
	}
	Producto.init(
		{
			codigo: { type: DataTypes.STRING(15), allowNull: false, unique: true },
			descripcion: { type: DataTypes.STRING(120), allowNull: false },
		},
		{
			sequelize,
			modelName: 'Producto',
			timestamps: false,
		}
	);
	return Producto;
};
