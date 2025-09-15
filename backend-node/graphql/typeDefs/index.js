const { gql } = require('apollo-server-express');
const { mergeTypeDefs } = require('@graphql-tools/merge');

const userTypeDefs = require('./user');
const accountTypeDefs = require('./account');
const bankTransactionTypeDefs = require('./bank_transaction');
const columnMappingTypeDefs = require('./column_mapping');
const expenseTypeDefs = require('./expense');
const frequencyDetailTypeDefs = require('./frequency_detail');
const frequencyTypeDefs = require('./frequency');
const importFileTypeDefs = require('./import_file');
const incomeTypeDefs = require('./income');
const transactionMatchTypeDefs = require('./transaction_match');

const rootTypeDefs = gql`
    type Query
    type Mutation
`;

const typeDefs = mergeTypeDefs([
  rootTypeDefs,
  userTypeDefs,
  accountTypeDefs,
  bankTransactionTypeDefs,
  columnMappingTypeDefs,
  expenseTypeDefs,
  frequencyDetailTypeDefs,
  importFileTypeDefs,
  frequencyTypeDefs,
  incomeTypeDefs,
  transactionMatchTypeDefs,
]);

module.exports = typeDefs;