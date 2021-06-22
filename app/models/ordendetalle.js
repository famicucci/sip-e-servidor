'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class OrdenDetalle extends Model {
		static associate(models) {
			OrdenDetalle.belongsTo(models.Orden, {
				foreignKey: { allowNull: false },
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
			OrdenDetalle.belongsTo(models.Producto, {
				foreignKey: { name: 'ProductoCodigo', allowNull: false },
				targetKey: 'codigo',
				onDelete: 'NO ACTION',
				onUpdate: 'NO ACTION',
			});
			OrdenDetalle.belongsTo(models.PtoStock, {
				foreignKey: { allowNull: false },
				onDelete: 'NO ACTION',
				onUpdate: 'NO ACTION',
			});
		}
	}
	OrdenDetalle.init(
		{
			cantidad: DataTypes.INTEGER,
			pu: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
			origen: DataTypes.STRING(15),
			BacklogProduccionId: { type: DataTypes.INTEGER },
		},
		{
			sequelize,
			modelName: 'OrdenDetalle',
			timestamps: false,
		}
	);
	return OrdenDetalle;
};
