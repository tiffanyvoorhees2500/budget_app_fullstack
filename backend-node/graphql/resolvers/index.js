const { mergeResolvers } = require('@graphql-tools/merge');

const userResolvers = require('./user');
const accountResolvers = require('./account');
const bankTransactionResolvers = require('./bank_transaction');
const columnMappingResolvers = require('./column_mapping');
const frequencyDetailResolvers = require('./frequency_detail');
const importFileResolvers = require('./import_file');
const transactionMatchResolvers = require('./transaction_match');
const expenseResolvers = require('./expense');
const frequencyResolvers = require('./frequency');
const incomeResolvers = require('./income');

const resolvers = mergeResolvers([
  userResolvers,
  accountResolvers,
  bankTransactionResolvers,
  columnMappingResolvers,
  expenseResolvers,
  frequencyDetailResolvers,
  frequencyResolvers,
  importFileResolvers,
  incomeResolvers,
  transactionMatchResolvers,
]);

module.exports = resolvers;
