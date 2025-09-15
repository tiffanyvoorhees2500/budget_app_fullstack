'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.User, { foreignKey: 'user_id' });

      Account.hasMany(models.Income, {
        foreignKey: 'to_account_id',
        as: 'incomingIncomes',
      });
      Account.hasMany(models.Expense, {
        foreignKey: 'from_account_id',
        as: 'outgoingExpenses',
      });
      Account.hasMany(models.Expense, {
        foreignKey: 'to_account_id',
        as: 'incomingRefunds',
      });
      Account.hasMany(models.Expense, {
        foreignKey: 'plan_account_id',
        as: 'plannedExpenses',
      });
      Account.hasMany(models.BankTransaction, {
        foreignKey: 'from_account_id',
        as: 'outgoingTransactions',
      });
      Account.hasMany(models.BankTransaction, {
        foreignKey: 'to_account_id',
        as: 'incomingTransactions',
      });
    }
  }
  Account.init(
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
      account_bank_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      beg_balance: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      bank_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      target_goal: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
      },
      goal_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      track_spending: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'Account',
      tableName: 'accounts',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'account_bank_name'],
        },
      ],
    }
  );
  return Account;
};
