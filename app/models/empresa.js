'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Empresa extends Model {
		static associate(models) {
			Empresa.hasMany(models.Producto, { foreignKey: { allowNull: false } });
			Empresa.hasMany(models.Usuario, { foreignKey: { allowNull: false } });
			Empresa.hasMany(models.PtoStock, { foreignKey: { allowNull: false } });
			Empresa.hasMany(models.PrecioLista, { foreignKey: { allowNull: false } });
		}
	}
	Empresa.init(
		{
			nombre: { type: DataTypes.STRING(30), allowNull: false, unique: true },
		},
		{
			sequelize,
			modelName: 'Empresa',
			timestamps: false,
		}
	);
	return Empresa;
};
