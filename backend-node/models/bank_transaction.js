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
      BankTransaction.belongsTo(models.Account, {
        foreignKey: 'from_account_id',
        as: 'fromAccount',
      });
      BankTransaction.belongsTo(models.Account, {
        foreignKey: 'to_account_id',
        as: 'toAccount',
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
        type: DataTypes.DATE,
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
      memo: {
        type: DataTypes.STRING,
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
    },
    {
      sequelize,
      modelName: 'BankTransaction',
      tableName: 'bank_transactions',
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
  return BankTransaction;
};
