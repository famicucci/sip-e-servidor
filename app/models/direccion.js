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
			calle: { type: DataTypes.STRING(30) },
			numeroCalle: { type: DataTypes.INTEGER },
			piso: { type: DataTypes.INTEGER(3) },
			depto: { type: DataTypes.INTEGER(3) },
			barrio: { type: DataTypes.STRING(30) },
			ciudad: { type: DataTypes.STRING(30) },
			provincia: { type: DataTypes.STRING(30) },
			codPostal: { type: DataTypes.INTEGER },
			refDireccion: { type: DataTypes.STRING(120) },
		},
		{
			sequelize,
			modelName: 'Direccion',
		}
	);
	return Direccion;
};
