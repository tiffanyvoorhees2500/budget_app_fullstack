'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Expense.belongsTo(models.User, { foreignKey: 'user_id' });
      Expense.belongsTo(models.Account, {
        foreignKey: 'from_account_id',
        as: 'fromAccount',
      });
      Expense.belongsTo(models.Account, {
        foreignKey: 'to_account_id',
        as: 'toAccount',
      });
      Expense.belongsTo(models.Account, {
        foreignKey: 'plan_account_id',
        as: 'planningAccount',
      });
      Expense.belongsTo(models.Frequency, {
        foreignKey: 'frequency_id',
        as: 'frequency',
      });
      Expense.belongsTo(models.Frequency, {
        foreignKey: 'plan_frequency_id',
        as: 'planningFrequency',
      });
      Expense.belongsTo(models.Income, {
        foreignKey: 'plan_income_id',
        as: 'planningIncome',
      });
    }
  }
  Expense.init(
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
      pay_to: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
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
      from_account_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      to_account_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      plan_account_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      frequency_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      plan_frequency_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      plan_income_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Expense',
      tableName: 'expenses',
      timestamps: false,
      validate: {
        eitherAccount() {
          if (!this.from_account_id && !this.to_account_id) {
            throw new Error(
              'Either from_account_id or to_account_id must be provided.'
            );
          }
        },
      },
    }
  );
  return Expense;
};
