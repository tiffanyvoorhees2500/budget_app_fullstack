const { Income } = require('../../models');

module.exports = {
  Query: {
    incomes: async () => await Income.findAll(),
    income: async (_, { id }) => await Income.findByPk(id),
  },
  Mutation: {
    createIncome: async (_, { input }) => {
      const income = await Income.create(input);
      return income;
    },
    updateIncome: async (_, { id, input }) => {
      const income = await Income.findByPk(id);
      if (!income) throw new Error('Income not found');
      await income.update(input);
      return income;
    },
    deleteIncome: async (_, { id }) => {
      const income = await Income.findByPk(id);
      if (!income) throw new Error('Income not found');
      await income.destroy();
      return { success: true, message: 'Income deleted' };
    },
  },
  Income: {
    user: async (income) => await income.getUser(),
    toAccount: async (income) => await income.getToAccount(),
    frequency: async (income) => await income.getFrequency(),
    plannedExpenses: async (income) => await income.getPlannedExpenses(),
  },
};
