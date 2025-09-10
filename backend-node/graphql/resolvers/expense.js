const { Expense } = require('../../models');

module.exports = {
    Query: {
        expenses: async () => await Expense.findAll(),
        expense: async (_, { id }) => await Expense.findByPk(id),
    },
    Mutation: {
        createExpense: async (_, { input }) => {
            const expense = await Expense.create(input);
            return expense;
        },
        updateExpense: async (_, { id, input }) => {
            const expense = await Expense.findByPk(id);
            if (!expense) throw new Error('Expense not found');
            await expense.update(input);
            return expense;
        },
        deleteExpense: async (_, { id }) => {
            const expense = await Expense.findByPk(id);
            if (!expense) throw new Error('Expense not found');
            await expense.destroy();
            return { success: true, message: 'Expense deleted' };
        },
    },
    Expense: {
        user: async (expense) => await expense.getUser(),
        fromAccount: async (expense) => await expense.getFromAccount(),
        toAccount: async (expense) => await expense.getToAccount(),
        planningAccount: async (expense) => await expense.getPlanningAccount(),
        frequency: async (expense) => await expense.getFrequency(),
        planningFrequency: async (expense) => await expense.getPlanningFrequency(),
        planningIncome: async (expense) => await expense.getPlanningIncome(),
    },
};
