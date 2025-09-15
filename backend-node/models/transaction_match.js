'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TransactionMatch extends Model {
    static associate(models) {
      // define association here
      TransactionMatch.belongsTo(models.User, { foreignKey: 'user_id' });
      TransactionMatch.belongsTo(models.BankTransaction, {
        foreignKey: 'bank_transaction_id',
      });
      TransactionMatch.belongsTo(models.Expense, { foreignKey: 'expense_id' });
      TransactionMatch.belongsTo(models.Income, { foreignKey: 'income_id' });
    }
  }
  TransactionMatch.init(
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
      bank_transaction_id: {
        type: DataTypes.STRING,
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
      match_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      amount_matched: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'TransactionMatch',
      tableName: 'transaction_matches',
      timestamps: false,
    }
  );
  return TransactionMatch;
};
