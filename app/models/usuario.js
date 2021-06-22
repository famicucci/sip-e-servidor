'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Usuario extends Model {
		static associate(models) {
			Usuario.belongsTo(models.Empresa, {
				foreignKey: { allowNull: false },
				onDelete: 'RESTRICT',
				onUpdate: 'RESTRICT',
			});
			Usuario.hasMany(models.MovimientoStock, {
				foreignKey: { allowNull: false },
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
			Usuario.hasMany(models.Orden, {
				foreignKey: { allowNull: false },
				onDelete: 'RESTRICT',
				onUpdate: 'RESTRICT',
			});
			Usuario.hasMany(models.Gasto, {
				foreignKey: { allowNull: false },
				onDelete: 'RESTRICT',
				onUpdate: 'RESTRICT',
			});
		}
	}
	Usuario.init(
		{
			nombre: { type: DataTypes.STRING(50), allowNull: false },
			password: { type: DataTypes.STRING(150), allowNull: false },
			usuario: { type: DataTypes.STRING(15), allowNull: false },
			rol: { type: DataTypes.BOOLEAN, allowNull: false },
		},
		{
			sequelize,
			modelName: 'Usuario',
		}
	);
	return Usuario;
};
