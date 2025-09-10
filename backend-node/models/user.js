'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Account, { foreignKey: 'user_id' });
      User.hasMany(models.Income, { foreignKey: 'user_id' });
      User.hasMany(models.Expense, { foreignKey: 'user_id' });
      User.hasMany(models.BankTransaction, { foreignKey: 'user_id' });
    }

    async validPassword(password) {
      return await bcrypt.compare(password, this.password);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: 'Must be a valid email address' },
          notEmpty: { msg: 'Email must not be empty  ' },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [6, 25],
            msg: 'Password must be at least 6 characters long',
          },
        },
      },
      // For OAuth users
      google_id: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
      timestamps: true,
    }
  );
  return User;
};
