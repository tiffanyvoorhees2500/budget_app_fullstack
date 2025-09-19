'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ColumnMapping extends Model {
    static associate(models) {
      // define association here
      ColumnMapping.belongsTo(models.User, { foreignKey: 'user_id' });
      ColumnMapping.belongsTo(models.ImportFile, { foreignKey: 'import_file_id' });
    }
  }

  ColumnMapping.init(
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
      import_file_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      column_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mapped_to: {
        type: DataTypes.ENUM(
          'id',
          'amount',
          'credit',
          'debit',
          'transactions_type',
          'date',
          'account_nickname',
          'description1',
          'description2',
          'description3',
          'description4',
          'default_category'
        ),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ColumnMapping',
      tableName: 'column_mappings',
      timestamps: false,
    }
  );
  return ColumnMapping;
};