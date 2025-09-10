const { mergeResolvers } = require('@graphql-tools/merge');

const userResolvers = require('./user');
const accountResolvers = require('./account');
const bankTransactionResolvers = require('./bank_transaction');
const expenseResolvers = require('./expense');
const frequencyResolvers = require('./frequency');
const incomeResolvers = require('./income');

const resolvers = mergeResolvers([
  userResolvers,
  accountResolvers,
  bankTransactionResolvers,
  expenseResolvers,
  frequencyResolvers,
  incomeResolvers,
]);

module.exports = resolvers;
