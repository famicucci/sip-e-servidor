'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Producto extends Model {
		static associate(models) {
			Producto.belongsTo(models.Empresa);
			Producto.hasMany(models.Stock, { foreignKey: { allowNull: false } });
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
		}
	);
	return Producto;
};
