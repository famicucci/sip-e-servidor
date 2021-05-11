'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovimientoStock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  MovimientoStock.init({
    ProductoCodigo: DataTypes.STRING,
    cantidad: DataTypes.INTEGER,
    PtoStockId: DataTypes.INTEGER,
    UsuarioId: DataTypes.INTEGER,
    motivo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MovimientoStock',
  });
  return MovimientoStock;
};