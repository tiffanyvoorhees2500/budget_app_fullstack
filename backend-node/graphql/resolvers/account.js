const { Account } = require('../../models');

module.exports = {
  Query: {
    accounts: async (_, __, {user}) => {
      if (!user) throw new Error('User is not authenticated');
      return await Account.findAll({ where: { user_id: user.id } });
    },
    account: async (_, { id }, {user}) => {
      if (!user) throw new Error('User is not authenticated');
      const account = await Account.findOne({ where: { id, user_id: user.id } });
      if (!account) throw new Error('Account not found');
      return account;
    },
  },
  Mutation: {
    createAccount: async (_, { input }, {user}) => {
      if (!user) throw new Error('User is not authenticated');
      const account = await Account.create({ ...input, user_id: user.id, is_active: true });
      return account;
    },
    updateAccount: async (_, { id, input }, {user}) => {
      if (!user) throw new Error('User is not authenticated');

      const account = await Account.findOne({ where: { id, user_id: user.id } });
      if (!account) throw new Error('Account not found');

      await account.update(input);
      return account;
    },
    deleteAccount: async (_, { id }, {user}) => {
      if (!user) throw new Error('User is not authenticated');
      const account = await Account.findOne({ where: { id, user_id: user.id } });

      if (!account) throw new Error('Account not found');
      await account.destroy();
      
      return { success: true, message: 'Account deleted' };
    },
  },
  Account: {
    user: async (account) => await account.getUser(),
    outgoingTransactions: async (account) =>
      await account.getOutgoingTransactions(),
    incomingTransactions: async (account) =>
      await account.getIncomingTransactions(),
    outgoingExpenses: async (account) => await account.getOutgoingExpenses(),
    incomingRefunds: async (account) => await account.getincomingRefunds(),
    plannedExpenses: async (account) => await account.getPlannedExpenses(),
    incomingIncomes: async (account) => await account.getIncomingIncomes(),
  },
};
