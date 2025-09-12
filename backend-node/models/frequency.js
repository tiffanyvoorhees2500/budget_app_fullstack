'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Frequency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // frequency doesn't need to show associated data ever
    }
  }
  Frequency.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      interval: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      day_of_month: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      week_of_month: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      day_of_week: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      special_day: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      callback_func_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Frequency',
      tableName: 'frequencies',
      timestamps: false,
    }
  );
  return Frequency;
};
