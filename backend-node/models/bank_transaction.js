'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BankTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BankTransaction.belongsTo(models.User, { foreignKey: 'user_id' });
      BankTransaction.belongsTo(models.Account, { foreignKey: 'account_id' });

      BankTransaction.hasMany(models.TransactionMatch, {
        foreignKey: 'bank_transaction_id',
      });
    }
  }
  BankTransaction.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      default_category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description4: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'BankTransaction',
      tableName: 'bank_transactions',
      timestamps: false,
    }
  );
  return BankTransaction;
};
