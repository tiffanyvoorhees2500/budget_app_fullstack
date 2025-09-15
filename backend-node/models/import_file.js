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
    },
    {
      sequelize,
      modelName: 'ImportFile',
      tableName: 'import_files',
      timestamps: false,
    }
  );
  return ImportFile;
};
