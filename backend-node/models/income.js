'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Income.belongsTo(models.User, { foreignKey: 'user_id' });
      Income.belongsTo(models.Frequency, { foreignKey: 'frequency_id' });
      Income.belongsTo(models.Account, {
        foreignKey: 'to_account_id',
        as: 'toAccount',
      });

      Income.hasMany(models.Expense, {
        foreignKey: 'plan_income_id',
        as: 'plannedExpenses',
      });
    }
  }
  Income.init(
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      salary_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
      },
      num_hours: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
      },
      rate_per_hour: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
      },
      set_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
      },
      frequency_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      to_account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Income',
      tableName: 'incomes',
      timestamps: false,
    }
  );
  return Income;
};
