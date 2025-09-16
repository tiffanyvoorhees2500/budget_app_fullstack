'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ImportFile extends Model {
    static associate(models) {
      // define association here
      ImportFile.belongsTo(models.User, { foreignKey: 'user_id' });
      
      ImportFile.hasMany(models.ColumnMapping, {
        foreignKey: 'import_file_id',
      });
    }
  }
  ImportFile.init(
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
      file_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      has_account_column: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      account_nickname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      amount_correct: {
        type: DataTypes.BOOLEAN,
      }
    },
    {
      sequelize,
      modelName: 'ImportFile',
      tableName: 'import_files',
      timestamps: false,
      validate: {
        accountInfoConsistency() {
          const nickname = this.account_nickname.trim();
          if (!this.has_account_column && !nickname) {
            throw new Error('If has_account_column is false, account_nickname must be provided.');
          }
        },
      },
    }
  );
  return ImportFile;
};
