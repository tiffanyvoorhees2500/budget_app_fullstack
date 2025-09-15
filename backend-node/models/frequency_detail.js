'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FrequencyDetail extends Model {
    static associate(models) {
      // define association here
      FrequencyDetail.belongsTo(models.User, { foreignKey: 'user_id' });
      FrequencyDetail.belongsTo(models.Frequency, {
        foreignKey: 'frequency_id',
      });
      FrequencyDetail.belongsTo(models.Expense, { foreignKey: 'expense_id' });
      FrequencyDetail.belongsTo(models.Income, { foreignKey: 'income_id' });
    }
  }
  FrequencyDetail.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      frequency_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expense_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      income_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      day_of_month: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      week_of_month: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
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
    },
    {
      sequelize,
      modelName: 'FrequencyDetail',
      tableName: 'frequency_details',
      timestamps: false,
    }
  );
  return FrequencyDetail;
};
