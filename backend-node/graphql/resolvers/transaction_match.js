const { TransactionMatch } = require('../../models');

module.exports = {
  Query: {
    transactionMatches: async (_, __, {user}) => {
      if (!user) throw new Error('User is not authenticated');
      return await TransactionMatch.findAll({ where: { user_id: user.id } });
    },
    transactionMatch: async (_, { id }, {user}) => {
      if (!user) throw new Error('User is not authenticated');
      const transactionMatch = await TransactionMatch.findOne({ where: { id, user_id: user.id } });
      if (!transactionMatch) throw new Error('TransactionMatch not found');
      return transactionMatch;
    },
  },
  Mutation: {
    createTransactionMatch: async (_, { input }, {user}) => {
      if (!user) throw new Error('User is not authenticated');
      const transactionMatch = await TransactionMatch.create({ ...input, user_id: user.id });
      return transactionMatch;
    },
    updateTransactionMatch: async (_, { id, input }, {user}) => {
      if (!user) throw new Error('User is not authenticated');

      const transactionMatch = await TransactionMatch.findOne({ where: { id, user_id: user.id } });
      if (!transactionMatch) throw new Error('TransactionMatch not found');

      await transactionMatch.update(input);
      return transactionMatch;
    },
    deleteTransactionMatch: async (_, { id }, {user}) => {
      if (!user) throw new Error('User is not authenticated');
      const transactionMatch = await TransactionMatch.findOne({ where: { id, user_id: user.id } });

      if (!transactionMatch) throw new Error('TransactionMatch not found');
      await transactionMatch.destroy();

      return { success: true, message: 'TransactionMatch deleted' };
    },
  },
  TransactionMatch: {
    user: async (transactionMatch) => await transactionMatch.getUser(),
    bankTransaction: async (transactionMatch) => await transactionMatch.getBankTransaction(),
    expense: async (transactionMatch) => await transactionMatch.getExpense(),
    income: async (transactionMatch) => await transactionMatch.getIncome(),
  },
};