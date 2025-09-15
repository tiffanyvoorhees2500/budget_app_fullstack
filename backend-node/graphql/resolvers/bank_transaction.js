const { BankTransaction } = require('../../models');

module.exports = {
  Query: {
    bankTransactions: async () => await BankTransaction.findAll(),
    bankTransaction: async (_, { id }) => await BankTransaction.findByPk(id),
  },
  Mutation: {
    createBankTransaction: async (_, { input }) => {
      const bankTransaction = await BankTransaction.create(input);
      return bankTransaction;
    },
    updateBankTransaction: async (_, { id, input }) => {
      const bankTransaction = await BankTransaction.findByPk(id);
      if (!bankTransaction) throw new Error('BankTransaction not found');
      await bankTransaction.update(input);
      return bankTransaction;
    },
    deleteBankTransaction: async (_, { id }) => {
      const bankTransaction = await BankTransaction.findByPk(id);
      if (!bankTransaction) throw new Error('BankTransaction not found');
      await bankTransaction.destroy();
      return { success: true, message: 'BankTransaction deleted' };
    },
  },
  BankTransaction: {
    user: async (bankTransaction) => await bankTransaction.getUser(),
    fromAccount: async (bankTransaction) =>
      await bankTransaction.getFromAccount(),
    toAccount: async (bankTransaction) => await bankTransaction.getToAccount(),
    transactionMatches: async (bankTransaction) =>
      await bankTransaction.getTransactionMatches(),
  },
};
