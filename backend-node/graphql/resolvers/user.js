const bcrypt = require('bcryptjs');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const { generateToken, verifyToken } = require('../../utils/jwt');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return await User.findByPk(user.id);
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        throw new Error('Invalid email');
      }

      // const valid = await bcrypt.compare(password, user.password);
      const valid = password === user.password
      if (!valid) {
        throw new Error('Invalid password');
      }

      // issue JWT
      const token = generateToken(user);
      return { user, token };
    },

    createUser: async (_, { input }) => {
      const existing = await User.findOne({ where: { email: input.email } });
      if (existing) throw new Error('User with this email already exists');

      const user = await User.create(input);

      // issue JWT right after creation
      const token = generateToken(user);

      return { user, token };
    },
    updateUser: async (_, { id, input }) => {
      const user = await User.findByPk(id);
      if (!user) throw new Error('User not found');
      await user.update(input);
      return user;
    },
    deleteUser: async (_, { id }) => {
      const user = await User.findByPk(id);
      if (!user) throw new Error('User not found');
      await user.destroy();
      return { success: true, message: 'User deleted' };
    },
  },
  User: {
    accounts: async (user) => await user.getAccounts(),
    bankTransactions: async (user) => await user.getBankTransactions(),
    expenses: async (user) => await user.getExpenses(),
    incomes: async (user) => await user.getIncomes(),
    importFiles: async (user) => await user.getImportFiles(),
    columnMappings: async (user) => await user.getColumnMappings(),
    transactionMatches: async (user) => await user.getTransactionMatches(),
    frequencyDetails: async (user) => await user.getFrequencyDetails(),
  },
};
