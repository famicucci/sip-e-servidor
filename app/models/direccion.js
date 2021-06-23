'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Direccion extends Model {
		static associate(models) {
			Direccion.belongsTo(models.Cliente, {
				foreignKey: { allowNull: false },
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
		}
	}
	Direccion.init(
		{
			calle: { type: DataTypes.STRING(30), allowNull: false },
			numeroCalle: { type: DataTypes.INTEGER, allowNull: false },
			piso: { type: DataTypes.INTEGER(3) },
			depto: { type: DataTypes.INTEGER(3) },
			barrio: { type: DataTypes.STRING(30), allowNull: false },
			ciudad: { type: DataTypes.STRING(30), allowNull: false },
			provincia: { type: DataTypes.STRING(30) },
			codPostal: { type: DataTypes.INTEGER, allowNull: false },
			refDireccion: { type: DataTypes.STRING(120) },
		},
		{
			sequelize,
			modelName: 'Direccion',
			tableName: 'direcciones',
		}
	);
	return Direccion;
};
