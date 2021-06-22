'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Cliente extends Model {
		static associate(models) {
			Cliente.belongsTo(models.Empresa, {
				foreignKey: { allowNull: false },
				onDelete: 'RESTRICT',
				onUpdate: 'RESTRICT',
			});
			Cliente.hasMany(models.Direccion, {
				foreignKey: { allowNull: false },
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
		}
	}
	Cliente.init(
		{
			nombre: { type: DataTypes.STRING(30), allowNull: false },
			apellido: { type: DataTypes.STRING(30), allowNull: false },
			observaciones: { type: DataTypes.STRING(120) },
			instagram: { type: DataTypes.STRING(30) },
			facebook: { type: DataTypes.STRING(30) },
			celular: { type: DataTypes.STRING(30) },
			email: { type: DataTypes.STRING(30), allowNull: false },
			mascota: { type: DataTypes.STRING(30) },
			tipo: { type: DataTypes.STRING(15), allowNull: false },
			dni: { type: DataTypes.STRING(15) },
			razonSocial: { type: DataTypes.STRING(30) },
			condIva: { type: DataTypes.STRING(30), allowNull: false },
		},
		{
			sequelize,
			modelName: 'Cliente',
		}
	);
	return Cliente;
};
